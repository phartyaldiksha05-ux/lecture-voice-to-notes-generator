import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    MONGO_URI = os.environ.get('MONGO_URI')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'change_me'
    IBM_STT_APIKEY = os.environ.get('IBM_STT_APIKEY')
    IBM_STT_URL = os.environ.get('IBM_STT_URL')
    IBM_COS_APIKEY = os.environ.get('IBM_COS_APIKEY')
    IBM_COS_RESOURCE_INSTANCE_ID = os.environ.get('IBM_COS_RESOURCE_INSTANCE_ID')
    IBM_COS_ENDPOINT = os.environ.get('IBM_COS_ENDPOINT')
    IBM_COS_BUCKET = os.environ.get('IBM_COS_BUCKET')
    IBM_GRANITE_APIKEY = os.environ.get('IBM_GRANITE_APIKEY')
    IBM_GRANITE_URL = os.environ.get('IBM_GRANITE_URL')
    JSON_SORT_KEYS = False

config = Config()
