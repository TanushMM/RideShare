from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient

searcher_bp = Blueprint('searcher', __name__)

client = MongoClient("mongodb://127.0.0.1:27017/")
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
        
        if collection.count_documents({'email': poster}) == 1:
            data = collection.find_one({"email":poster})
            data['feedback_from_searchers'].append({"email": email, 
                                                    "rating": data['rating'], 
                                                    "comments": data['comments']})
            # collection.update_one({'email': email}, {})
        else:
            pass
        
        return jsonify({"Message":"Hello", 'email':poster}), 200
    except Exception as e:
        return jsonify({"Error" : str(e)}), 500