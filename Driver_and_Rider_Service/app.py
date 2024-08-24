from flask import Flask, Blueprint
from flask_jwt_extended import JWTManager
from blueprints.driver.driver import driver_bp
from blueprints.rider.rider import rider_bp
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)


app.register_blueprint(driver_bp, url_prefix='/driver')
app.register_blueprint(rider_bp, url_prefix='/rider')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True, ssl_context=('../cert.pem', '../key.pem'))