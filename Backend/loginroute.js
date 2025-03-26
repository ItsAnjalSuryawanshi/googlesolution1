from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Change this to your DB URI
db = SQLAlchemy(app)

# User model (assuming you have this defined elsewhere)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), default='athlete')

    def check_password(self, password):
        return check_password_hash(self.password, password)

# Login route
@app.route('/api/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    # --- IMPORTANT: Generate and return an authentication token ---
    # In a real application, you would generate a secure token here (e.g., JWT)
    # For example (using a hypothetical generate_token function):
    # token = generate_token(user)  
    # return jsonify({'message': 'Login successful', 'token': token}), 200

    # For this example, I'll just return a success message without a token (INSECURE)
    return jsonify({'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
