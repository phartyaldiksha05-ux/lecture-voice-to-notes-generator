from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from config import config
from routes.auth import auth_bp
from routes.lecture import lecture_bp
from middleware.cors_middleware import init_cors

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config['MONGO_URI'] = config.MONGO_URI
    app.config['JWT_SECRET_KEY'] = config.JWT_SECRET_KEY

    mongo.init_app(app)
    JWTManager(app)
    init_cors(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(lecture_bp, url_prefix='/api/lecture')

    @app.route('/api/health')
    def health():
        return jsonify({'status': 'ok'})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
