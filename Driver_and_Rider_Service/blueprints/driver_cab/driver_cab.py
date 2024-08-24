from flask import Blueprint, request, jsonify, render_template
import pymysql as db
from dotenv import load_dotenv
load_dotenv()
import os
from flask_jwt_extended import jwt_required

connection = db.connect(host="localhost", user='root', password=os.getenv('MYSQL_PASSWORD'), database="rideshare")
cursor = connection.cursor()

driver_cab_bp = Blueprint('driver_cab', __name__, template_folder='templates')

@driver_cab_bp.route('/')
def main():
    return render_template('driver_cab.html')


@driver_cab_bp.route('/cabData')
@jwt_required()
def cab_data():
    try:
        cursor.execute('select * from cabs')
        data = cursor.fetchall()
        return jsonify({
            "message": "success",
            "contents": data
        }), 200
    except Exception as e:
        return jsonify({
            "message": "fail",
            "contents": f"Database Error - {str(e)}"
        }), 500

@driver_cab_bp.route('/getCab', methods=['POST'])
@jwt_required()
def get_cab():
    try:
        _id = request.json.get('_id')
        cursor.execute(f"select * from cabs where _id = '{_id}'")
        data = cursor.fetchall()
        
        #handling the condition where the db return success but there is no record that matches the given driverID
        if len(data) == 0: 
            return jsonify({
            "message": "fail",
            "contents": f"No Match"
        }), 404
        return jsonify({
            "message": "success",
            "contents": data
        }), 200
    except Exception as e:
        return jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500

@driver_cab_bp.route("/addCab", methods=['POST'])
@jwt_required()
def add_cab():
    data = request.json
    
    try:
        _id = data.get('_id')
        aadhar_id = data.get('aadhar_id')
        vehicle_number = data.get('vehicle_number')
        vehicle_type = data.get('vehicle_type')
        vehicle_model = data.get('vehicle_model')
        cursor.execute(f"insert into cabs values ({_id},'{aadhar_id}','{vehicle_number}','{vehicle_type}','{vehicle_model}')")
        connection.commit()

        return jsonify({
            "message": "success",
            "contents": None
        }), 200
    except Exception as e:
        return jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500