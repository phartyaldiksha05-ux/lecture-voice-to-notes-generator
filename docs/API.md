# API Documentation

Base URL: `/api`

Auth

- POST /api/auth/register
  - body: {name, email, password}
  - response: 201 user created

- POST /api/auth/login
  - body: {email, password}
  - response: {access_token}

Lecture

- POST /api/lecture/upload
  - headers: Authorization: Bearer <token>
  - form-data: file, title
  - response: lecture object

- GET /api/lecture/all
  - list lectures for current user

- GET /api/lecture/:id
  - get lecture document

- DELETE /api/lecture/:id
  - delete lecture

- POST /api/lecture/transcribe
  - body: {lectureId}
  - runs IBM STT and stores transcript

- POST /api/lecture/generate-notes
  - body: {lectureId}
  - calls Granite model to produce summary, keyPoints, notes

- POST /api/lecture/export-pdf
  - body: {lectureId}
  - returns base64 PDF (or upload to COS)

Authentication: uses JWT via `Flask-JWT-Extended`.
