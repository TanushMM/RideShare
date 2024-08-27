from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from blueprints.user.user import user_bp
import os
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')

CORS(app)
jwt = JWTManager(app)

app.register_blueprint(user_bp, url_prefix='/user')

@app.route('/')
def main():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True)