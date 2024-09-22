from flask import Blueprint, jsonify, request, render_template
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required
from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['users']

user_bp = Blueprint("user", __name__, template_folder='templates')

@user_bp.route('/')
def main():
    return render_template('user.html')

@user_bp.route('/userData')
@jwt_required()
def user_data():
    response = ""
    try:
        data = collection.find()
        response_data = []
        for record in data:
            record['_id'] = str(record['_id'])
            response_data.append(record)
        response = jsonify({
            "message": "success",
            "contents": response_data
        }), 200
    except Exception as e:
        response =  jsonify({
            "message": "fail",
            "contents": f"Database Error - {str(e)}"
        }), 500
    return response

@user_bp.route('/getUser', methods=['POST'])
@jwt_required()
def get_user():
    response = ""
    try:
        _id_from_Authentication_Server = request.json.get('_id')
        response_data = collection.find_one({'_id': ObjectId(_id_from_Authentication_Server)})
        response_data['_id'] = str(response_data['_id'])

        response = jsonify({
            "message": "success",
            "contents": response_data
        }), 200
    except Exception as e:
        response = jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500

    return response

@user_bp.route("/addUser", methods=['POST'])
@jwt_required()
def add_user():
    response = ""
    try:
        data = request.json
        data['_id'] = ObjectId(data['_id'])
        collection.insert_one(data)
        
        feedback_collection = db['feedback']
        feedback_collection.insert_one({
            "email": data['email'],
            "feedback_from_searchers": ["Good Driver"],
            "feedback_from_posters": ["Good Rider"]
        })
        
        response = jsonify({
            "message": "Admin/User added successfully"
        }), 200
    except Exception as e:
        response = jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500
    return response