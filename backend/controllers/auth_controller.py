from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import datetime

USERS = 'users'

def register_user(data):
    from app import mongo
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not (name and email and password):
        return jsonify({'error': 'Missing fields'}), 400

    existing = mongo.db[USERS].find_one({'email': email})
    if existing:
        return jsonify({'error': 'User already exists'}), 400

    hashed = generate_password_hash(password)
    user = {
        'name': name,
        'email': email,
        'password': hashed,
        'createdAt': datetime.utcnow()
    }
    res = mongo.db[USERS].insert_one(user)
    user['_id'] = str(res.inserted_id)
    return jsonify({'message': 'User registered', 'user': {'id': user['_id'], 'name': name, 'email': email}}), 201

def login_user(data):
    from app import mongo
    email = data.get('email')
    password = data.get('password')
    if not (email and password):
        return jsonify({'error': 'Missing fields'}), 400
    user = mongo.db[USERS].find_one({'email': email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=str(user['_id']))
    return jsonify({'access_token': access_token, 'user': {'id': str(user['_id']), 'name': user['name'], 'email': user['email']}})
