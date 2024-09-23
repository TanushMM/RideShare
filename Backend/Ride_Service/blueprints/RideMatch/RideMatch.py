from flask import Blueprint, jsonify, json
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from openai import OpenAI
import os
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from math import sqrt 

load_dotenv()

client = MongoClient("mongodb://127.0.0.1:27017/")  # Keep it as localhost in production
db = client['rideshare']
search_collection = db['search_ride']
post_collection = db['post_ride']

llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

ridematch_bp = Blueprint('ridematch', __name__)

@ridematch_bp.route("/")
def main():
    return jsonify({"Message": "Hello from Ride Match Service"})

def get_recommendation(search_ride, posted_rides):
    prompt = [{
        "role": "user",
        "content": f"""
        You are a travel assistant. I have a search route and several available ride offers. Your task is to recommend the most suitable ride(s) based on the provided information.

        **Search Ride Details:**
        - Date: {search_ride['date']}
        - From: {search_ride['from']['coordinates']}
        - To: {search_ride['to']['coordinates']}
        - Time: {search_ride['time']}
        - Distance: {search_ride['distance']} meters

        **Available Ride Offers:**
        {''.join([f"{i+1}. Ride from {ride['from']['coordinates']} to {ride['to']['coordinates']} with _id {ride['_id']}, Date: {ride['date']}, Time: {ride['time']}, Driving Style: {ride['drivingStyle']}" for i, ride in enumerate(posted_rides)])}

        Please follow these steps:
        
        1. **Match Condition**: Only recommend rides where the source (from) and destination (to) coordinates EXACTLY match the search route.
        
        2. **Ranking**: Rank the matched rides based on their proximity to the search date and time (the closer, the better). For rides with similar date and time, give preference to those with shorter distances.
        
        3. **Price Calculation**: Calculate the price for each matched ride based on the formula: Rupees 12 per 1000 meters of distance traveled.

        Provide the results in the following JSON format:"""
        + r"""
        {
            0: {_id: '_id', price: 0.002030969387400664, score: rank}
            1: {_id: '_id', price: 0.002030969387400664, score: rank}
            
        }
        Do not include any other explanations or comments, just the strict JSON output.
        """
    }]
    response = llm.chat.completions.create(
        model="gpt-4o-mini",
        messages=prompt,
        max_tokens=150
    )

    return response


def calculate_distance(coord1, coord2):
    if isinstance(coord1, dict) and isinstance(coord2, dict):
        return sqrt((coord1['lat'] - coord2['lat'])**2 + (coord1['lng'] - coord2['lng'])**2)
    else:
        raise ValueError("Coordinates must be in dictionary format with 'lat' and 'lng' keys")

def calculate_price(distance):
    return (distance / 1000) * 12

def cosine_similarity_score(ride1, ride2):
    vector1 = np.array([ride1['from']['coordinates']['lat'], ride1['from']['coordinates']['lng'],
                        ride1['to']['coordinates']['lat'], ride1['to']['coordinates']['lng']]).flatten()
    vector2 = np.array([ride2['from']['coordinates']['lat'], ride2['from']['coordinates']['lng'],
                        ride2['to']['coordinates']['lat'], ride2['to']['coordinates']['lng']]).flatten()
    
    return cosine_similarity([vector1], [vector2])[0][0]

def get_best_match(search_ride, posted_rides):
    matches = []
    search_distance = calculate_distance(search_ride['from']['coordinates'], search_ride['to']['coordinates'])
    price = calculate_price(search_distance) # distance is present in search_data itself, update it fast
    
    for ride in posted_rides:
        match_score = cosine_similarity_score(search_ride, ride)
        
        if match_score > 0.9:
            matches.append({'_id': ride['_id'], 'score': match_score, 'price': price})

    matches = sorted(matches, key=lambda x: x['score'], reverse=True)
    result = {}
    
    for i, match in enumerate(matches):
        result[str(i)] = {'_id': match['_id'], 'score': match['score'], 'price': match['price']}
    return result

    
@ridematch_bp.route("/match", methods=["GET"])
@jwt_required()
def match():
    try:
        email = get_jwt_identity()
        search_data = search_collection.find_one({"email": email})

        if not search_data:
            return jsonify({"Error": "User has not initiated any trip searches"})

        search_data['_id'] = str(search_data['_id'])

        post_data = post_collection.find()
        list_of_post_data = []
        for record in post_data:
            record['_id'] = str(record['_id'])
            list_of_post_data.append(record)

        recommendation = get_recommendation(search_data, list_of_post_data)

        json_formatted_result = json.loads(recommendation.choices[0].message.content)

        return jsonify({
            "search_data": search_data,
            "post_data": list_of_post_data,
            "match_result": json_formatted_result
        }), 200

    except Exception as e:
        try:
            email = get_jwt_identity()
            search_data = search_collection.find_one({"email": email})

            if not search_data:
                return jsonify({"Error": "User has not initiated any trip searches"})

            search_data['_id'] = str(search_data['_id'])

            post_data = post_collection.find()
            list_of_post_data = []
            for record in post_data:
                record['_id'] = str(record['_id'])
                list_of_post_data.append(record)
                
            matches = get_best_match(search_data, list_of_post_data)
            
            return jsonify({
            "search_data": search_data,
            "post_data": list_of_post_data,
            "match_result": matches
        }), 200
        except Exception as e:
            return jsonify({"Error": str(e)}), 500