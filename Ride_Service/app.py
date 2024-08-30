from flask import Flask
from blueprints.RideSearch.RideSearch import ridesearch_bp
from blueprints.RidePost.RidePost import ridepost_bp
from blueprints.RideMatch.RideMatch import ridematch_bp
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(ridesearch_bp, url_prefix="/search")
app.register_blueprint(ridepost_bp, url_prefix="/post")
app.register_blueprint(ridematch_bp, url_prefix="/match")

@app.route('/')
def main():
    return "<h1>Hello from Ride Services</h1>"
    pass

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)