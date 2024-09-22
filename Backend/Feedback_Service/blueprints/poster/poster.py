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
        data = request.data
        searcher = data['searcher']
        
        if collection.count_documents({'email': searcher}) == 1:
            pass
        else:
            pass
        
        return jsonify({"Message":"Hello", 'email':email}), 200
    except Exception as e:
        return jsonify({"Error" : str(e)}), 500