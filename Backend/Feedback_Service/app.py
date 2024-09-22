from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from blueprints.searcher.searcher import searcher_bp
from blueprints.poster.poster import poster_bp

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(searcher_bp, url_prefix='/searcher')
app.register_blueprint(poster_bp, url_prefix='/poster')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5200, debug=True)