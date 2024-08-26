from flask import Blueprint, request, jsonify, render_template
import pymysql as db
from flask_jwt_extended import jwt_required
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['cabs']

driver_cab_bp = Blueprint('driver_cab', __name__, template_folder='templates')

@driver_cab_bp.route('/')
def main():
    return render_template('driver_cab.html')

@driver_cab_bp.route('/cabData')
@jwt_required()
def cab_data():
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

@driver_cab_bp.route('/getCab', methods=['POST'])
@jwt_required()
def get_cab():
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

@driver_cab_bp.route("/addCab", methods=['POST'])
@jwt_required()
def add_cab():
    response = ""
    try:
        data = request.json
        data['_id'] = ObjectId(data['_id'])
        collection.insert_one(data)
        
        response = jsonify({
            "message": "Cab added successfully"
        }), 200
    except Exception as e:
        response = jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500
    return response