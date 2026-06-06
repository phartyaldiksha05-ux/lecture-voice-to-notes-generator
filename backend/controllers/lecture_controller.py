from flask import jsonify
from datetime import datetime
from services.ibm_services import upload_to_cos, transcribe_from_ibm, generate_with_granite
from utils.pdf_generator import build_pdf_bytes
from bson.objectid import ObjectId

LECTURES = 'lectures'

def upload_lecture(user_id, file, title):
    from app import mongo
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400
    if file.filename.split('.')[-1].lower() not in ['mp3', 'wav', 'm4a', 'mp4']:
        return jsonify({'error': 'Unsupported file type'}), 400

    # upload to IBM COS
    cos_url = upload_to_cos(file)

    lecture = {
        'userId': user_id,
        'title': title or file.filename,
        'audioUrl': cos_url,
        'transcript': None,
        'summary': None,
        'keyPoints': [],
        'keywords': [],
        'notes': None,
        'createdAt': datetime.utcnow()
    }
    res = mongo.db[LECTURES].insert_one(lecture)
    lecture['_id'] = str(res.inserted_id)
    return jsonify({'message': 'Uploaded', 'lecture': lecture}), 201

def get_all_lectures(user_id):
    from app import mongo
    items = list(mongo.db[LECTURES].find({'userId': user_id}).sort('createdAt', -1))
    for it in items:
        it['_id'] = str(it['_id'])
    return jsonify({'lectures': items})

def get_lecture(user_id, lecture_id):
    from app import mongo
    it = mongo.db[LECTURES].find_one({'_id': ObjectId(lecture_id), 'userId': user_id})
    if not it:
        return jsonify({'error': 'Not found'}), 404
    it['_id'] = str(it['_id'])
    return jsonify({'lecture': it})

def delete_lecture(user_id, lecture_id):
    from app import mongo
    res = mongo.db[LECTURES].delete_one({'_id': ObjectId(lecture_id), 'userId': user_id})
    if res.deleted_count == 0:
        return jsonify({'error': 'Not found or unauthorized'}), 404
    return jsonify({'message': 'Deleted'})

def transcribe_audio(data):
    from app import mongo
    lecture_id = data.get('lectureId')
    lecture = mongo.db[LECTURES].find_one({'_id': ObjectId(lecture_id)})
    if not lecture:
        return jsonify({'error': 'Lecture not found'}), 404
    audio_url = lecture.get('audioUrl')
    transcript = transcribe_from_ibm(audio_url)
    mongo.db[LECTURES].update_one({'_id': ObjectId(lecture_id)}, {'$set': {'transcript': transcript}})
    return jsonify({'lectureId': lecture_id, 'transcript': transcript})

def generate_notes(data):
    from app import mongo
    lecture_id = data.get('lectureId')
    lecture = mongo.db[LECTURES].find_one({'_id': ObjectId(lecture_id)})
    if not lecture:
        return jsonify({'error': 'Lecture not found'}), 404
    transcript = lecture.get('transcript')
    if not transcript:
        return jsonify({'error': 'Transcript missing. Run /transcribe first.'}), 400

    prompt = f"""
    Given the following lecture transcript, produce:
    1) Summary (concise),
    2) Key concepts (bulleted),
    3) Important definitions (term: definition),
    4) Chapter-wise notes (divide by timestamps or logical sections),
    5) Revision notes (short bullets),
    6) Keywords (ranked)

    Transcript:
    {transcript}
    """
    ai_response = generate_with_granite(prompt)

    # Expected ai_response as dict with keys: summary, keyPoints, definitions, chapters, revision, keywords
    # For robustness accept JSON string or dict
    import json
    if isinstance(ai_response, str):
        try:
            ai_data = json.loads(ai_response)
        except Exception:
            ai_data = {'summary': ai_response}
    else:
        ai_data = ai_response

    mongo.db[LECTURES].update_one({'_id': ObjectId(lecture_id)}, {'$set': {
        'summary': ai_data.get('summary'),
        'keyPoints': ai_data.get('keyPoints') or ai_data.get('key_points') or [],
        'keywords': ai_data.get('keywords') or [],
        'notes': ai_data.get('chapters') or ai_data.get('notes') or ai_data.get('revision') or None
    }})

    return jsonify({'lectureId': lecture_id, 'ai': ai_data})

def export_pdf(data):
    from app import mongo
    lecture_id = data.get('lectureId')
    lecture = mongo.db[LECTURES].find_one({'_id': ObjectId(lecture_id)})
    if not lecture:
        return jsonify({'error': 'Lecture not found'}), 404

    pdf_bytes = build_pdf_bytes(lecture)
    # Optionally: upload PDF to COS and return URL. For now return as base64
    import base64
    encoded = base64.b64encode(pdf_bytes).decode('utf-8')
    return jsonify({'lectureId': lecture_id, 'pdf_base64': encoded})
