from werkzeug.utils import secure_filename

ALLOWED_EXT = {'mp3','wav','m4a'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXT

def safe_filename(filename):
    return secure_filename(filename)
