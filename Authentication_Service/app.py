

"""
This is just the python version of server.js 
This is not present in the production
"""




from flask import Flask, request, jsonify
from pymongo import MongoClient
import requests
from bson.objectid import ObjectId
import os

app = Flask(__name__)

client = MongoClient("mongodb://127.0.0.1:27017/")  
db = client['rideshare']  

users_collection = db['users']
admins_collection = db['admins']

@app.route("/", methods=["GET"])
def fetch_users_and_admins():
    try:
        users = list(users_collection.find())  # Fetch all users
        admins = list(admins_collection.find())  # Fetch all admins
        
        # Format records to JSON-friendly format
        for user in users:
            user['_id'] = str(user['_id'])
        for admin in admins:
            admin['_id'] = str(admin['_id'])

        return jsonify({"users": users, "admins": admins})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Route to handle login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    print(email, password)
    user = None

    try:
        # Check if admin or user based on email domain
        if "@hexaware.admin" in email:
            user = admins_collection.find_one({"email": email, "password": password})
        elif "@hexaware.user" in email:
            user = users_collection.find_one({"email": email, "password": password})

        if not user:
            return jsonify({"message": "Invalid credentials"}), 400
        
        # Fetch JWT from external server
        try:
            response = requests.post('http://127.0.0.1:5000/getJWT', json={"jwt": user['email']})
            response_data = response.json()
            total_server_access_token = response_data.get("total_server_access_token")

            return jsonify({
                "message": "Login successful",
                "user": user,
                "token": total_server_access_token
            })
        except Exception as e:
            print("Error fetching JWT:", str(e))
            return jsonify({"message": "Error fetching JWT"}), 500

    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Route to handle registration
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check if user already exists
    if users_collection.find_one({"email": email}) or admins_collection.find_one({"email": email}):
        return jsonify({"message": "User already registered"}), 403

    try:
        new_user_or_admin = None

        if "@hexaware.admin" in email:
            new_user_or_admin = {
                "name": name,
                "email": email,
                "password": password
            }
            admins_collection.insert_one(new_user_or_admin)
        elif "@hexaware.user" in email:
            new_user_or_admin = {
                "name": name,
                "email": email,
                "password": password
            }
            users_collection.insert_one(new_user_or_admin)
        else:
            return jsonify({"message": "Invalid email domain"}), 400

        new_user_or_admin["_id"] = str(new_user_or_admin["_id"])
        return jsonify(new_user_or_admin), 201

    except Exception as e:
        print("Error registering user:", str(e))
        return jsonify({"message": str(e)}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001, debug=True)
