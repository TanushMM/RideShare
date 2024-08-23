from flask import Blueprint, jsonify, request, render_template
import pymysql as db
from dotenv import load_dotenv
load_dotenv()
import os

connection = db.connect(host="localhost", user='root', password=os.getenv('MYSQL_PASSWORD'), database="ride_share")
cursor = connection.cursor()

rider_bp = Blueprint("rider", __name__, template_folder='templates')


@rider_bp.route('/')
def main():
    return render_template('rider.html')



@rider_bp.route('/riderData')
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
def get_driver():
    '''
    Send the ID of the Rider via the contents of the HTTP request
    eg:
    {"id": "1"}
    '''
    try:
        id = request.json.get('id')
        cursor.execute(f"select * from riders where id = '{id}'")
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
def add_rider():
    data = request.json
    
    try:
        name = data.get('name')
        email = data.get('email')
        
        cursor.execute("INSERT INTO riders (name, email) VALUES (%s, %s)", (name, email))
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