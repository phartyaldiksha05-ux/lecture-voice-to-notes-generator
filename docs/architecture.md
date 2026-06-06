# Architecture Diagram (text)

User -> Frontend (React + Tailwind) -> Backend (Flask API) -> MongoDB Atlas
                                   |-> IBM COS (store audio / pdf)
                                   |-> IBM Watson STT (transcribe)
                                   |-> IBM Granite / watsonx.ai (generate notes)

Services are protected by JWT authentication; frontend stores JWT and passes Authorization header.
