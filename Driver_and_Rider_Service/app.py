from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from blueprints.driver.driver import driver_bp
from blueprints.rider.rider import rider_bp
from blueprints.driver_cab.driver_cab import driver_cab_bp
import os
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')

jwt = JWTManager(app)
CORS(app)

app.register_blueprint(driver_bp, url_prefix='/driver')
app.register_blueprint(rider_bp, url_prefix='/rider')
app.register_blueprint(driver_cab_bp, url_prefix='/driver/cab')

@app.route('/')
def main():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True)