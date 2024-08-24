from flask import Blueprint, jsonify, request, render_template
import pymysql as db
from dotenv import load_dotenv
load_dotenv()
import os
from flask_jwt_extended import jwt_required


def get_db_connection():
    return db.connect(host="localhost", user='root', password=os.getenv('MYSQL_PASSWORD'), database="rideshare")

driver_bp = Blueprint("driver", __name__, template_folder='templates')

@driver_bp.route('/')
def main():
    return render_template('driver.html')


@driver_bp.route('/driverData')
@jwt_required()
def driver_data():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
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
    finally:
        cursor.close()
        connection.close()

@driver_bp.route('/getDriver/', methods=['POST'])
@jwt_required()
def get_driver():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        _id = request.json.get('_id')
        cursor.execute(f"select * from drivers where _id = '{_id}'")
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
    finally:
        cursor.close()
        connection.close()

@driver_bp.route("/addDriver", methods=['POST'])
@jwt_required()
def add_driver():
    data = request.json
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
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
    finally:
        cursor.close()
        connection.close()