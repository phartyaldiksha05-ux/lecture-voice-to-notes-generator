# Lecture Voice-to-Notes Generator

A full-stack application to convert lecture audio into structured notes using IBM Cloud AI services.

Folders:
- frontend: React + Tailwind UI
- backend: Flask API

See `docs/` for API documentation and deployment guide.

Quick start (backend):

1. Copy `.env.example` to `.env` and fill values.
2. Create a Python virtualenv and install:

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r backend/requirements.txt
cd backend
python app.py
```

Quick start (frontend):

```bash
cd frontend
npm install
npm run start
```

Notes:
- IBM service integrations are in `backend/services/ibm_services.py` as clear placeholders. Provide your IBM credentials and implement COS upload with `ibm_boto3` and watsonx/granite generation endpoints.
- This project is scaffolded for production deployment (Vercel for frontend; Render or Heroku for backend). See `docs/deployment.md`.
