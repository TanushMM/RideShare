from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

bot_bp = Blueprint('bot', __name__)

@bot_bp.route('/')
def main():
    pass


@bot_bp.route('/chat', methods=['POST'])
# @jwt_required
def chat():
    print('Entered the function')
    response = ""
    try:
        data = request.json
        print(data)
        return jsonify({'data': data}), 200
    except Exception as e:
        return jsonify({'error':str(e)}), 500