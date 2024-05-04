from flask import Flask, request, session, redirect, url_for, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key

# Mock user data (replace with a real user database in a production environment)
user = {'username': 'user', 'password': 'password'}

@app.route('/home', methods=['GET'])
def home():
    if 'username' in session:
        return jsonify({'message': f'Logged in as {session["username"]}'})
    return jsonify({'message': 'You are not logged in'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if username == user['username'] and password == user['password']:
        session['username'] = username
        return redirect(url_for('home'))
    else:
        return jsonify({'error': 'Invalid username or password'})

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
