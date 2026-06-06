# 🎓 Lecture Voice-to-Notes Generator

An AI-powered educational platform that converts lecture recordings into structured study materials using Speech-to-Text and Generative AI.

## 🚀 Overview

Students often struggle to take notes while paying attention during lectures. This project solves that problem by automatically converting lecture audio into:

* 📄 Well-structured notes
* 📝 Lecture summaries
* ❓ Quiz questions
* 🧠 Flashcards
* 📑 Downloadable PDF study material

The system leverages AI to improve learning efficiency and help students revise faster.

---

## ✨ Features

### 🎤 Audio Upload

Upload lecture recordings in supported audio formats.

### 🗣 Speech-to-Text Conversion

Convert spoken lectures into accurate text transcripts.

### 📄 AI-Generated Notes

Generate concise and structured study notes from lecture transcripts.

### 📝 Smart Summarization

Extract key concepts and important discussion points.

### ❓ Quiz Generation

Automatically create practice questions for self-assessment.

### 🧠 Flashcard Creation

Generate flashcards for quick revision and active recall learning.

### 📑 PDF Export

Download generated notes and study material as PDF files.

### 🌙 Dark Mode Support

Modern and user-friendly interface with dark mode functionality.

### 📚 Lecture History

Access previously processed lectures and generated notes.

---

## 🏗 System Architecture

```text
Lecture Audio
      │
      ▼
Speech-to-Text Engine
      │
      ▼
Transcript Generation
      │
      ▼
IBM Watsonx / Generative AI
      │
      ├── Summary
      ├── Notes
      ├── Quiz
      └── Flashcards
      │
      ▼
Student Dashboard
```

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Context API

### Backend

* Python
* Flask
* REST APIs

### AI & Cloud

* IBM Watsonx.ai
* IBM Granite Models
* Speech-to-Text Services

### DevOps

* Docker
* Docker Compose
* GitHub

---

## 📂 Project Structure

```text
Lecture Voice-to-Notes Generator
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── utils/
│
├── docs/
│   ├── API.md
│   ├── architecture.md
│   └── deployment.md
│
└── docker-compose.yml
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/phartyaldiksha05-ux/lecture-voice-to-notes-generator.git
cd lecture-voice-to-notes-generator
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
IBM_API_KEY=your_api_key
IBM_PROJECT_ID=your_project_id
IBM_URL=your_watsonx_url
JWT_SECRET=your_secret_key
```

---

## ▶ Running the Application

### Backend

```bash
cd backend

python app.py
```

### Frontend

```bash
cd frontend

npm run dev
```

---

## 📸 Screenshots

Add screenshots here:

* Landing Page
* Upload Lecture
* Processing Screen
* Generated Notes
* Quiz Page
* Flashcards
* Dashboard

---

## 🎯 Use Cases

* Students
* Online Learning Platforms
* Universities
* Educational Institutions
* Self-Learning Enthusiasts

---

## 🔮 Future Enhancements

* Multi-language support
* Real-time lecture transcription
* Agentic AI workflow integration
* Lecture chatbot using RAG
* Personalized learning recommendations
* Mobile application

---

## 👩‍💻 Author

**Diksha Phartyal**

MCA Student | AI & Full Stack Developer

GitHub: https://github.com/phartyaldiksha05-ux

---

## 📜 License

This project is developed for educational and research purposes.
