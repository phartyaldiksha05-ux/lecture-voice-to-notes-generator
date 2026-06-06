# Deployment Guide

Frontend (Vercel):
- Push the `frontend` folder to a GitHub repo.
- Create a Vercel project and point to the `frontend` folder.
- Set environment variables (if any) in Vercel.

Backend (Render or Render.com / Render service):
- Push `backend` to a repo.
- Create a Python web service in Render, set build command `pip install -r requirements.txt` and start command `gunicorn app:app`.
- Set environment variables from `.env` in the Render dashboard (MONGO_URI, JWT_SECRET_KEY, IBM keys).

MongoDB Atlas:
- Create cluster, create database `lecture_notes`, copy connection string into `MONGO_URI`.

IBM Cloud:
- Create an IBM Cloud Object Storage instance and get credentials.
- Create Watson Speech to Text and Granite/watsonx.ai and get API keys and endpoints.

Notes:
- Ensure CORS rules allow the frontend domain to call the backend.
- Use HTTPS in production and secure your JWT secret.
