from flask import Flask, make_response, request, jsonify

app = Flask(__name__)
app.config["SECRET_KEY"] = 'your_secret_key'  # Change this to a random secret key

@app.route('/counter', methods=['GET'])
def get_counter():
    counter = request.cookies.get('counter', 0)
    return jsonify({'counter': counter})

@app.route('/increment', methods=['POST'])
def increment_counter():
    counter = int(request.cookies.get('counter', 0))
    counter += 1
    response = make_response(jsonify({'message': 'Counter incremented', 'counter': counter}))
    response.set_cookie('counter', str(counter))
    return response

@app.route('/reset', methods=['POST'])
def reset_counter():
    response = make_response(jsonify({'message': 'Counter reset'}))
    response.set_cookie('counter', '0')
    return response

if __name__ == '__main__':
    app.run(debug=True)    
