from flask import Blueprint
from flask_jwt_extended import jwt_required

bot_bp = Blueprint('bot', __name__)

@bot_bp.route('/')
def main():
    pass


@bot_bp.route('/chat')
@jwt_required
def chat():
    pass