# **🏥 Healthcare Document Management Platform**
# Full Stack Assessment — Document Upload System

This project is built as part of a Full Stack Developer Assignment.
It is a complete end-to-end application where users can upload, list, download, and delete PDF health documents through a clean Healthcare Dashboard UI.


# **🚀 Tech Stack**

# 🖥️ Frontend

React (Vite)

React Router

Tailwind CSS (CDN)

Axios


# ⚙️ Backend

Node.js + Express

Multer (file uploads)

SQLite3 (lightweight database)


# 📂 Features

✔ Upload PDF documents (max 5MB)

✔ Validate file type and size

✔ List all uploaded documents with metadata

✔ Download PDFs

✔ Delete documents (DB + storage cleanup)

✔ Beautiful Healthcare Dashboard UI

✔ Fully responsive layout

✔ No login required (as per assignment instructions)


# **🧠 Project Architecture**
Frontend (React + Vite)
        ↓ REST API Calls
Backend (Express.js)
        ↓
SQLite Database + Local File Storage


# Database Stores:

filename

filepath

filesize

created_at


# 🛠️ How to Run the Backend

1. Navigate to backend
cd backend

2. Install dependencies
npm install

3. Start server
node index.js


**Backend runs at:**
👉 http://localhost:4000

# 💻 How to Run the Frontend
1. Navigate to frontend
cd frontend

2. Install dependencies
npm install

3. Start development server
npm run dev


**Frontend runs at:**
👉 http://localhost:5173

📡 API Endpoints
📤 POST /documents/upload

Upload a PDF file
Body: multipart/form-data → file

📄 GET /documents
Fetch list of all uploaded documents

📥 GET /documents/:id
Download file by ID

🗑 DELETE /documents/:id
Delete file from DB + filesystem


# **📁 Project Structure**
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


**📘 Assumptions**

Only one user (no authentication needed)

All uploaded files are healthcare-related PDFs

Application runs locally via Express + SQLite


