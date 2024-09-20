from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from blueprints.bot.bot import bot_bp
from blueprints.VirtualCompanion.VirtualCompanion import vc_bp

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(bot_bp, url_prefix='/bot')
app.register_blueprint(vc_bp, url_prefix='/vc')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5150, debug=True)