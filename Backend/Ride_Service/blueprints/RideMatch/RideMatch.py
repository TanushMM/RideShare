from flask import Blueprint, jsonify, json
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = MongoClient("mongodb://mongo_db:27017/") # Keep it as local host in the production 
db = client['rideshare']
search_collection = db['search_ride']
post_collection = db['post_ride']

llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

ridematch_bp = Blueprint('ridematch',__name__)

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
        {''.join([f"{i+1}. Ride from {ride['from']['coordinates']} to {ride['to']['coordinates']} with _id {ride['_id']}, Date: {ride['date']}, Time: {ride['time']}, Driving Style: {ride['drivingStyle']}, Seats: {ride['seats']}" for i, ride in enumerate(posted_rides)])}

        Please provide a recommendation [based on the cosine similarity] on which of the available rides best matches the search route based on factors like the distance, date, and time. 

        In addition, provide the price of the ride based on the distance and travel time with a base price of Rupees 12 per 1000 meters. 

        Give it in the format of JSON as in the following:
        """ + r"""
        {
            "1": <_id of best match>,
            "2": <_id of next best match>,
            ...... until the end,
            "amount": <amount - amount is same because the search ride is same irrespective of the ride posts>
        }

        I want the above format, I don't need any other extra words, just the output in the above format. Strictly no other words.
        """
    }]

    response = llm.chat.completions.create(
        model="gpt-4o-mini",
        messages=prompt,
        max_tokens=150
    )
    
    return response

    
@ridematch_bp.route("/match")
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
        
        return jsonify({"search_data": search_data, "post_data": list_of_post_data, "match_result": json_formatted_result}), 200
    
    except Exception as e:
        return jsonify({"Error": str(e)}), 500