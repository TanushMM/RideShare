from flask import Blueprint, jsonify, request, render_template
import pymysql as db
from dotenv import load_dotenv
load_dotenv()
import os
from flask_jwt_extended import jwt_required
from pymongo import MongoClient

connection = db.connect(host="localhost", user='root', password=os.getenv('MYSQL_PASSWORD'), database="rideshare")
cursor = connection.cursor()

client = MongoClient("mongodb://3.111.198.198:27017/")
db = client['rideshare']
collection = db['riders']

rider_bp = Blueprint("rider", __name__, template_folder='templates')


@rider_bp.route('/')
def main():
    return render_template('rider.html')

@rider_bp.route('/riderData')
@jwt_required()
def get_rider():
    try:
        cursor.execute('select * from riders')
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

@rider_bp.route('/getRider', methods=['POST'])
@jwt_required()
def get_driver():
    '''
    Send the ID of the Rider via the contents of the HTTP request
    eg:
    {"id": "1"}
    '''
    try:
        _id = request.json.get('_id')
        cursor.execute(f"select * from riders where _id = '{_id}'")
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

@rider_bp.route("/addRider", methods=['POST'])
@jwt_required()
def add_rider():
    data = request.json
    
    try:
        _id = data.get('_id')
        name = data.get('name')
        email = data.get('email')
        
        cursor.execute("INSERT INTO riders VALUES (%s, %s, %s)", (_id, name, email))
        # cursor.execute(f"insert into riders values (NULL, '{name}','{email}')")
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