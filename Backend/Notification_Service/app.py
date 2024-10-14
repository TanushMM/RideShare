from quart import Quart, jsonify, request  # Use Quart instead of Flask for async support
from quart_cors import cors
from flask_jwt_extended import jwt_required
from openai import OpenAI
import os
from dotenv import load_dotenv
import json
import asyncio

# Below libraries pre-installed with Python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


load_dotenv()

app = Quart(__name__) 
app = cors(app) 

llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route("/", methods=['GET', 'POST'])
async def main():
    return jsonify({"message": "Hello from Notification Microservice"})


@app.route("/generate", methods=['GET', 'POST'])
# @jwt_required()
async def generate_notification():
    try:
        body = await request.get_json() 
        notification_type = body['notificationType']
        notification_method = body['notificationMethod']
        details = body['details']

        prompt = [{
            "role": "user",
            "content": f"""
            You are a notification assistant for a RideShare application. Your goal is to generate a notification that is fun, intuitive, and attention-grabbing, while providing all necessary details in JSON format.

            **Notification Details:**
            - Type: {notification_type}
            - Method: {notification_method}
            - Additional Information: {details}

            Please follow these steps:
            1. Craft an engaging and catchy notification header based on the type of notification (e.g., Ride confirmed, Ride cancelled, Ride ended, Payment received). Make it exciting and friendly!
            2. Write a fun, yet clear, content that is tailored to the notification method (email or text message), making sure to grab the user's attention.
            3. Return the header and content in the following strict JSON format:
            
            {{
                "header": "...",
                "content": "..."
            }}
            
            Ensure that the notification feels personal, lighthearted, and lively, but do not include any explanations, extra data, or comments—just the strict JSON output as specified.
            """
        }]
        
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(None, lambda: llm.chat.completions.create(
            model="gpt-4o-mini",
            messages=prompt,
            max_tokens=150
        ))

        
        generated_content = json.loads(response.choices[0].message.content)
        
        rideshare_logo_src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/Logo_2.png"
        rideshare_image_src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/Rideshare_Email_Notification_Banner.jpeg"
        header=generated_content["header"]
        content=generated_content["content"]
        
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{header}</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }}
                h1 {{
                    color: #4CAF50;
                }}
                p {{
                    font-size: 16px;
                    line-height: 1.5;
                }}
                .footer {{
                    margin-top: 20px;
                    font-size: 12px;
                    color: #999999;
                }}
                .cta {{
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                }}
                img {{
                    max-width: 100%;
                    height: auto;
                    border-radius: 5px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hexaware's RideShare - InnovateX_Crescent</h1>
                <img src="{rideshare_logo_src}" alt="Rideshare Logo" style="width: 100%; max-height: 150px; object-fit: contain;" />
                <h1>{header}</h1>
                <img src="{rideshare_image_src}" alt="A happy rider" />
                <p>{content}</p>
                
                <p>We're excited to have you on board! 🚀</p>
                
                <p>Thank you for choosing our service! If you have any questions, feel free to reach out.</p>
                
                <div class="footer">
                    <p>This email was sent to you because you are using RideShare. For further queries, please contact support.</p>
                </div>
            </div>
        </body>
        </html>
        """
        smtp_server = "smtp.gmail.com"  
        smtp_port = 587  
        from_email = os.getenv('FROM_EMAIL')
        password = os.getenv('PASSWORD')

        msg = MIMEMultipart()
        msg['From'] = from_email
        
        msg['To'] = body['email']
        msg['Subject'] = generated_content["header"]
        
        print(body['email'])
        print(generated_content["header"])

        msg.attach(MIMEText(html_content, 'html'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls() 
            server.login(from_email, password)  
            server.send_message(msg) 
        return jsonify({"success": "Email sent successfully!"})
            
    except Exception as e:
        return jsonify({"error":str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5250, debug=True)
