from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

SERVICE_ROUTES = {
    'authentication': 'http://3.110.16.132:9000',
    'authorization': 'http://3.110.16.132:5000',
    'user': 'http://3.110.16.132:5050',
    'ride': 'http://3.110.16.132:5100',
    'chat': 'http://3.110.16.132:5150',
    'feedback': 'http://3.110.16.132:5200'
}

def forward_request(service_url, path, method='GET', data=None, headers=None):
    try:
        url = f"{service_url}/{path}"
        
        json_data = None
        if data:
            try:
                json_data = json.loads(data.decode('utf-8'))
            except json.JSONDecodeError:
                return jsonify({"error": "Invalid JSON format"}), 400
            
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            response = requests.post(url, json=json_data, headers=headers)
        else:
            return jsonify({"error": "Unsupported HTTP method"}), 400
        
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route for authentication
@app.route('/authentication/<path:path>', methods=['GET', 'POST'])
def authentication(path):
    service_url = SERVICE_ROUTES['authentication']
    return forward_request(service_url, path, method=request.method, data=request.data, headers=request.headers)

# Route for authorization
@app.route('/authorization/<path:path>', methods=['GET', 'POST'])
def authorization(path):
    service_url = SERVICE_ROUTES['authorization']
    return forward_request(service_url, path, method=request.method, data=request.data, headers=request.headers)

# Route for user
@app.route('/user/<path:path>', methods=['GET', 'POST'])
def user(path):
    service_url = SERVICE_ROUTES['user']
    return forward_request(service_url, path, method=request.method, data=request.data, headers=request.headers)

# Route for ride
@app.route('/ride/<path:path>', methods=['GET', 'POST'])
def ride(path):
    service_url = SERVICE_ROUTES['ride']
    return forward_request(service_url, path, method=request.method, data=request.data, headers=request.headers)

# Route for chat
@app.route('/chat/<path:path>', methods=['GET', 'POST'])
def chat(path):
    service_url = SERVICE_ROUTES['chat']
    return forward_request(service_url, path, method=request.method, data=request.data, headers=request.headers)

@app.route('/feedback/<path:path>', methods=['GET', 'POST'])
def feedback(path):
    service_url = SERVICE_ROUTES['feedback']
    return forward_request(service_url, path, method=request.method, data=request.data, headers=request.headers)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "Service not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
