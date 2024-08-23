from flask import Flask, Blueprint
from blueprints.driver.driver import driver_bp
from blueprints.rider.rider import rider_bp

app = Flask(__name__)
app.register_blueprint(driver_bp, url_prefix='/driver')
app.register_blueprint(rider_bp, url_prefix='/rider')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)