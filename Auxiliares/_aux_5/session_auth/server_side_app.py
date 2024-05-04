from flask import Flask, request, session, redirect, url_for, jsonify
from flask_session import Session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key
app.config['SESSION_TYPE'] = 'filesystem'  # Change this to your preferred session storage type
Session(app)

# Mock user data (replace with a real user database in a production environment)
user = {'username': 'user', 'password': 'password'}

@app.route('/home', methods=['GET'])
def home():
    if 'username' in session:
        return jsonify({'message': f'Logged in as {session["username"]}'})
    return jsonify({'message': 'You are not logged in'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username == user['username'] and password == user['password']:
        session['username'] = username
        return redirect(url_for('home'))
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
