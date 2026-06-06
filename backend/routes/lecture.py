from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.lecture_controller import upload_lecture, get_all_lectures, get_lecture, delete_lecture, transcribe_audio, generate_notes, export_pdf

lecture_bp = Blueprint('lecture', __name__)

@lecture_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    user_id = get_jwt_identity()
    file = request.files.get('file')
    title = request.form.get('title')
    return upload_lecture(user_id, file, title)

@lecture_bp.route('/all', methods=['GET'])
@jwt_required()
def all_lectures():
    user_id = get_jwt_identity()
    return get_all_lectures(user_id)

@lecture_bp.route('/<lecture_id>', methods=['GET'])
@jwt_required()
def single_lecture(lecture_id):
    user_id = get_jwt_identity()
    return get_lecture(user_id, lecture_id)

@lecture_bp.route('/<lecture_id>', methods=['DELETE'])
@jwt_required()
def remove_lecture(lecture_id):
    user_id = get_jwt_identity()
    return delete_lecture(user_id, lecture_id)

@lecture_bp.route('/transcribe', methods=['POST'])
@jwt_required()
def transcribe():
    data = request.get_json() or {}
    return transcribe_audio(data)

@lecture_bp.route('/generate-notes', methods=['POST'])
@jwt_required()
def generate():
    data = request.get_json() or {}
    return generate_notes(data)

@lecture_bp.route('/export-pdf', methods=['POST'])
@jwt_required()
def export():
    data = request.get_json() or {}
    return export_pdf(data)
