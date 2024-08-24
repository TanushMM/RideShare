from flask import Blueprint, jsonify, request, render_template
import pymysql as db
from dotenv import load_dotenv
load_dotenv()
import os
from flask_jwt_extended import jwt_required


connection = db.connect(host="localhost", user='root', password=os.getenv('MYSQL_PASSWORD'), database="rideshare")
cursor = connection.cursor()

driver_bp = Blueprint("driver", __name__, template_folder='templates')

@driver_bp.route('/')
def main():
    return render_template('driver.html')


@driver_bp.route('/driverData')
@jwt_required()
def driver_data():
    try:
        cursor.execute('select * from drivers')
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

@driver_bp.route('/getDriver/', methods=['POST'])
@jwt_required()
def get_driver():
    try:
        _id = request.json.get('_id')
        cursor.execute(f"select * from drivers where _id = '{id}'")
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

@driver_bp.route("/addDriver", methods=['POST'])
@jwt_required()
def add_driver():
    data = request.json
    
    try:
        _id = data.get('_id')
        name = data.get('name')
        cab_id = data.get('cab_id')
        email = data.get('email')
        dob = data.get('dob')
        location = data.get('location')
        cursor.execute(f"insert into drivers values ('{_id}', '{name}','{cab_id}','{email}','{dob}','{location}')")
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