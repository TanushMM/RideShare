from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = MongoClient("mongodb://127.0.0.1:27017/") # Keep it as local host in the production 
db = client['rideshare']
collection = db['confirmed_ride']

llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

confirmed_ride_bp = Blueprint('confirmedride',__name__)

@confirmed_ride_bp.route("/")
def main():
    return jsonify({"Message": "Hello from Confirmed Rides Endpoint from Ride_Service"})

@confirmed_ride_bp.route("/post", methods=['POST'])
@jwt_required()
def post():
    try: 
        email = get_jwt_identity()
        data = request.json
        if collection.count_documents({"searcher": email}) >= 1:
            return jsonify({
                "message": "Ride already exists, cannot add new one"
            })
            
        result = collection.insert_one(data)
        return jsonify({"_id": str(result.inserted_id)}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

@confirmed_ride_bp.route("/delete", methods=['POST'])
@jwt_required()
def delete():
    email = get_jwt_identity()
    result = collection.delete_many({"searcher": email})
    return jsonify({"Message": f'success {result}'}), 200