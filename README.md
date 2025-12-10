🏥 Healthcare Document Management Platform
Full Stack Assessment — Document Upload System

This project is built as part of a Full Stack Developer Assignment.
It is a complete end-to-end application where users can upload, list, download, and delete PDF health documents through a clean Healthcare Dashboard UI.

🚀 Tech Stack
🖥 Frontend

React (Vite)

React Router

Tailwind CSS (CDN)

Axios

⚙️ Backend

Node.js + Express

Multer (file uploads)

SQLite3 (lightweight local DB)

📂 Features

✔ Upload PDF documents (max size: 5MB)
✔ Validate file type and size
✔ List all uploaded documents with metadata
✔ Download PDFs
✔ Delete documents (DB + disk cleanup)
✔ Beautiful Healthcare Dashboard UI
✔ Fully responsive layout
✔ No login required (as per assignment instructions)

🧠 Project Architecture
Frontend (React + Vite)
        ↓    REST API Calls
Backend (Express.js)
        ↓
SQLite Database + Local File Storage

Database Stores:

filename

filepath

filesize

created_at

🛠 How to Run the Backend
1️⃣ Navigate to backend folder
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Start the server
node index.js

Backend URL
http://localhost:4000

💻 How to Run the Frontend
1️⃣ Navigate to frontend folder
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev

Frontend URL
http://localhost:5173

📡 API Endpoints
📤 POST /documents/upload

Upload a PDF document.
Body: multipart/form-data → file

📄 GET /documents

Fetch all uploaded documents.

📥 GET /documents/:id

Download document by ID.

🗑 DELETE /documents/:id

Delete document from:

Database

Local /uploads folder

📁 Project Structure
backend/
│── index.js
│── uploads/
│── documents.db
└── migrations/
    └── init.sql

frontend/
└── src/
    ├── components/
    ├── pages/
    ├── App.jsx
    └── main.jsx
└── index.html

📘 Assumptions

Single user system — login not required (per assignment specs)

All uploaded files are healthcare-related PDFs

Application runs completely locally (Express + SQLite)
