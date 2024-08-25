from flask import Blueprint, jsonify, request, render_template
import pymysql as db
from dotenv import load_dotenv
load_dotenv()
import os
from flask_jwt_extended import jwt_required
from pymongo import MongoClient
from bson.objectid import ObjectId

rider_bp = Blueprint("rider", __name__, template_folder='templates')

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['riders']

@rider_bp.route('/')
def main():
    return render_template('rider.html')

@rider_bp.route('/riderData')
@jwt_required()
def get_rider():
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

@rider_bp.route('/getRider', methods=['POST'])
@jwt_required()
def get_driver():
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

@rider_bp.route("/addRider", methods=['POST'])
@jwt_required()
def add_rider():
    response = ""
    try:
        data = request.json
        data['_id'] = ObjectId(data['_id'])
        collection.insert_one(data)
        
        response = jsonify({
            "message": "Rider added successfully"
        }), 200
    except Exception as e:
        response = jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500
    return response