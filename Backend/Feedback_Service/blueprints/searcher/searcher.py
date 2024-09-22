from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient

searcher_bp = Blueprint('searcher', __name__)

client = MongoClient("mongodb://mongo_db:27017/")
db = client['rideshare']
collection = db['feedback']

@searcher_bp.route('/')
def main():
    return jsonify({'message': "Welcome to /searcher of the feedback service"}), 200

@searcher_bp.route('/post', methods=["POST"])
@jwt_required()
def post():
    try: 
        email = get_jwt_identity()
        data = request.json
        poster = data['poster']
        
        # when we /addUser using the User_Data_Service we also create a record in the feedback db hence
        # no need to check if a record exists in the feedback db
        feedback_collection = db['feedback']
        feedback_collection.update_one(
            {"email": poster},   
            {
                "$push": {       
                    "feedback_from_searchers": {
                        "email": email,       
                        "rating": data['rating'],  
                        "comments": data['comments'] 
                    }
                }
            }
        )                                  
    
        return jsonify({"Message": "Feedback successfully submitted", 'email': poster}), 200
    except Exception as e:
        return jsonify({"Error" : str(e)}), 500