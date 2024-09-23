from flask import Blueprint, jsonify, json
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from openai import OpenAI
import os
from dotenv import load_dotenv
import asyncio

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
            "1": <_id of best match>,
            "2": <_id of next best match>,
            ...... until the end,
            "amount": [
                {"_id": <_id of ride>, "price": <calculated price>}
            ]
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

    
@ridematch_bp.route("/match", methods=["GET"])
@jwt_required()
async def match():
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

        # Call async get_recommendation function
        recommendation = await get_recommendation(search_data, list_of_post_data)

        json_formatted_result = json.loads(recommendation.choices[0].message.content)

        return jsonify({
            "search_data": search_data,
            "post_data": list_of_post_data,
            "match_result": json_formatted_result
        }), 200

    except Exception as e:
        return jsonify({"Error": str(e)}), 500