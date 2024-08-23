from flask import Blueprint, jsonify, request
import mysql.connector as db

connection = db.connect(host="localhost", user='root', password='12345678', database="ride_share")
cursor = connection.cursor()

driver_bp = Blueprint("driver", __name__)

@driver_bp.route('/')
def main():
    return '''
    <html>
    <head>
        <title>Driver Endpoint Documentation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 40px;
            }
            h1 {
                color: #2c3e50;
            }
            h2 {
                color: #2980b9;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
            }
            code {
                background-color: #f4f4f4;
                padding: 2px 4px;
                border-radius: 4px;
                font-size: 14px;
            }
            pre {
                background-color: #f4f4f4;
                padding: 10px;
                border-radius: 4px;
                font-size: 14px;
            }
            ul {
                margin-left: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Driver API Documentation</h1>
        <p>Welcome to the documentation for the <code>/driver</code> endpoint. Below are the details of the available routes and how to use them.</p>

        <h2>1. /driverData (GET)</h2>
        <p>Retrieves all driver data from the database.</p>
        <p><strong>Method:</strong> GET</p>
        <p><strong>Response:</strong> JSON containing a message and the contents of the driver table.</p>
        <pre>
        {
            "message": "success",
            "contents": [
                ["D1", "ABC", "CB1", "abc@gmail.com", "2000-10-12", "Chennai"],
                ...
            ]
        }
        </pre>

        <h2>2. /getDriver (POST)</h2>
        <p>Retrieves the data of a specific driver based on the provided ID in the request body.</p>
        <p><strong>Method:</strong> POST</p>
        <p><strong>Request Body:</strong> JSON containing the driver ID.</p>
        <pre>
        {
            "id": "D1"
        }
        </pre>
        <p><strong>Response:</strong> JSON containing a message and the contents of the driver record, or a failure message if no match is found.</p>

        <h2>3. /addDriver (POST)</h2>
        <p>Adds a new driver to the database using the details provided in the request body.</p>
        <p><strong>Method:</strong> POST</p>
        <p><strong>Request Body:</strong> JSON containing the driver details.</p>
        <pre>
        {
            "id": "D1",
            "name": "ABC",
            "cab_id": "CB1",
            "email": "abc@gmail.com",
            "dob": "2000-10-12",
            "location": "Chennai"
        }
        </pre>
        <p><strong>Response:</strong> JSON containing a success message if the driver is added successfully, or a failure message if an error occurs.</p>

    </body>
    </html>
    '''


@driver_bp.route('/driverData')
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
def get_driver():
    '''
    Send the ID of the Driver via the contents of the HTTP request
    eg:
    {"id": "D1"}
    '''
    try:
        id = request.json.get('id')
        cursor.execute(f"select * from drivers where id = '{id}'")
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
def add_driver():
    data = request.json
    
    try:
        id = data.get('id')
        name = data.get('name')
        cab_id = data.get('cab_id')
        email = data.get('email')
        dob = data.get('dob')
        location = data.get('location')
        cursor.execute(f"insert into drivers values ('{id}','{name}','{cab_id}','{email}','{dob}','{location}')")
        cursor.execute('commit')

        return jsonify({
            "message": "success",
            "contents": None
        }), 200
    except Exception as e:
        return jsonify({
            "message": "fail",
            "contents": f"{str(e)}"
        }), 500