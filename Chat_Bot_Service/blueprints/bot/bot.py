from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

bot_bp = Blueprint('bot', __name__)
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

chat_history = []

def chatbot_response(user_query, chat_history):
    prompt = f"Provide a helpful response to the following user query: {user_query}"

    messages = [{"role": "system", "content": "You are a helpful assistant."}] + chat_history + [{"role": "user", "content": prompt}]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    
    return response

@bot_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    try:
        data = request.json
        user_message = data.get('text')

        response = chatbot_response(user_message, chat_history)
        bot_message = response.choices[0].message.content

        chat_history.append({"role": "user", "content": user_message})
        chat_history.append({"role": "assistant", "content": bot_message})

        return jsonify({'data': bot_message}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
