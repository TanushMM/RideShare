from flask import Flask, request, jsonify, render_template
from flask_jwt_extended import JWTManager, create_access_token
from dotenv import load_dotenv
import os
load_dotenv()
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=12)
CORS(app)
jwt = JWTManager(app)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/getJWT", methods=["POST"])
def get_jwt():
    try: 
        data = request.json
        token_from_login_service = data.get('jwt')
        total_server_access_token = create_access_token(identity=token_from_login_service)

        return jsonify({"message":"success", "total_server_access_token": total_server_access_token}), 200
    except Exception as e:
        return jsonify({"message": str(e)})
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)