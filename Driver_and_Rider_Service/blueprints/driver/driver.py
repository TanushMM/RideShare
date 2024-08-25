from flask import Blueprint, jsonify, request, render_template
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required
from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['rideshare']
collection = db['drivers']

driver_bp = Blueprint("driver", __name__, template_folder='templates')

@driver_bp.route('/')
def main():
    return render_template('driver.html')

@driver_bp.route('/driverData')
@jwt_required()
def driver_data():
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

@driver_bp.route('/getDriver/', methods=['POST'])
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

@driver_bp.route("/addDriver", methods=['POST'])
@jwt_required()
def add_driver():
    response = ""
    try:
        data = request.json
        data['_id'] = ObjectId(data['_id'])
        collection.insert_one(data)
        
        response = jsonify({
            "message": "Driver added successfully"
        }), 200
    except Exception as e:
        response = jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500
    return response