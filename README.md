🏥 Healthcare Document Management Platform
Full Stack Assessment — Document Upload System

This project is built as part of a Full Stack Developer Assignment.
It is a complete end-to-end application for uploading, listing, downloading, and deleting PDF documents.

🚀 Tech Stack
Frontend

React (Vite)

React Router

Tailwind CSS (CDN)

Axios

Backend

Node.js + Express

Multer (file upload)

SQLite3 database

📂 Features
✔ Upload PDF documents (max 5MB)
✔ Validate file size and type
✔ List uploaded documents with metadata
✔ Download any document
✔ Delete documents (from DB + disk)
✔ Clean healthcare dashboard UI
✔ Fully responsive design
✔ No login required (per assignment instruction)
🧠 Project Architecture

Frontend communicates with the backend through REST APIs:

React (Vite)  →  Express API → SQLite + File Storage


Database stores:

filename

filepath

filesize

created_at

🛠 How to Run the Backend
1. Navigate to backend:
cd backend

2. Install dependencies:
npm install

3. Start the server:
node index.js


Backend runs on:

http://localhost:4000

💻 How to Run the Frontend
1. Navigate to frontend:
cd frontend

2. Install dependencies:
npm install

3. Start dev server:
npm run dev


Frontend runs on:

http://localhost:5173

📡 API Endpoints
POST /documents/upload

Upload a PDF.
Body: multipart/form-data → file

GET /documents

List all documents.

GET /documents/:id

Download file by ID.

DELETE /documents/:id

Delete file from DB + filesystem.

📁 Project Structure
backend/
  index.js
  uploads/
  documents.db
  migrations/
    init.sql

frontend/
  src/
    components/
    pages/
    App.jsx
  index.html

📘 Assumptions

Only one user → no login needed.

All uploaded files are health-related PDFs.

Runs locally via Express & SQLite.
