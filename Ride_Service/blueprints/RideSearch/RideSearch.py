from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['search_ride']

ridesearch_bp = Blueprint('ridesearch',__name__)

@ridesearch_bp.route("/")
def main():
    data = collection.find()
    data_array = []
    for record in data:
        record['_id'] = str(record['_id'])
        data_array.append(record)
    return jsonify(data_array), 200


@ridesearch_bp.route('/find', methods=['GET'])
@jwt_required()
def find():
    try:
        email = get_jwt_identity()
        if collection.count_documents({'email': email}) >= 1:
            data = collection.find_one({'email': email})
            data['_id'] = str(data['_id'])
            return jsonify(data), 200
        else {
            return jsonify({"message": "User has not searched anything"}), 200
        }

    except Exception as e:
        return jsonify({"Error": str(e)}), 500

@ridesearch_bp.route('/post', methods=['GET','POST'])
@jwt_required()
def post():
    try:
        email = get_jwt_identity()
        # if collection.count_documents({"email": email}) >= 1:
        #     return jsonify({
        #         "message": "Ride already exists, cannot add new one"
        #     })

        request_body = request.json
        request_body['email'] = email
                
        collection.insert_one(request_body)
        print(request_body)

        return "Success" , 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@ridesearch_bp.route('/delete', methods=['GET','POST'])
@jwt_required()
def delete():
    try:
        email = get_jwt_identity()
        collection.delete_many({'email': email})
        return "Success" , 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500