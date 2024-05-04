from flask import Flask, request, jsonify
import jwt
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key

# Mock user data (replace with a real user database in a production environment)
user = {'username': 'user', 'password': 'password'}

def generate_token(username):
    payload = {
        'username': username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=30)  # Token expiration time
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

def decode_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

@app.route('/home', methods=['GET'])
def home():
    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing'}), 401
    
    token = auth_header.split(' ')[1]
    decoded = decode_token(token)
    if isinstance(decoded, str):
        return jsonify({'message': decoded}), 401
    
    return jsonify({'message': f'Logged in as {decoded["username"]}'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if username == user['username'] and password == user['password']:
        token = generate_token(username)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
