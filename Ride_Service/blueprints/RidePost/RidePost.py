from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['post_ride']

ridepost_bp = Blueprint('ridepost',__name__)

@ridepost_bp.route("/")
def main():
    data = collection.find()
    data_array = []
    for record in data:
        record['_id'] = str(record['_id'])
        data_array.append(record)
    return jsonify(data_array), 200


@ridepost_bp.route('/post', methods=['GET','POST'])
@jwt_required()
def post():
    print("Hello World")
    try:
        email = get_jwt_identity()
        if collection.count_documents({"email": email}) >= 1:
            return jsonify({
                "message": "Ride already exists, cannot add new one"
            })

        request_body = request.json
        request_body['email'] = email
                
        collection.insert_one(request_body)
        print(request_body)

        return "Success" , 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@ridepost_bp.route('/delete', methods=['GET','POST'])
@jwt_required()
def delete():
    try:
        email = get_jwt_identity()
        collection.delete_many({'email': email})
        return "Success" , 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500