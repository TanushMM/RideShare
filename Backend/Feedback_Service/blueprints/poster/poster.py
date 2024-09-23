from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient

poster_bp = Blueprint('poster', __name__)

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['feedback']

@poster_bp.route('/')
def main():
    return jsonify({'message': "Welcome to /poster of the feedback service"}), 200

@poster_bp.route('/post', methods=["POST"])
@jwt_required()
def post():
    try: 
        email = get_jwt_identity()
        data = request.json
        
        searcher = data['rider']
        
        # when we /addUser using the User_Data_Service we also create a record in the feedback db hence
        # no need to check if a record exists in the feedback db
        feedback_collection = db['feedback']
        feedback_collection.update_one(
            {"email": searcher},   
            {
                "$push": {       
                    "feedback_from_posters": {
                        "email": email,       
                        "rating": data['rating'],  
                    }
                }
            }
        )                                  
    
        return jsonify({"Message": "Feedback successfully submitted", 'email': searcher}), 200
    except Exception as e:
        return jsonify({"Error" : str(e)}), 500