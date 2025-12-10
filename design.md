design.md

Healthcare Document Management Platform — Design Document

Author: Vanshika Tiwari

Role: Full Stack Developer

Tech Stack: React (Vite), Tailwind CSS, Express.js, Multer, SQLite3

Date: December 2025

1. Overview

The Healthcare Document Management Platform is a full-stack application that allows users to:

Upload PDF documents (max 5MB)

View uploaded documents

Download any document

Delete documents

Persist metadata in a local SQLite database

Interact through a clean healthcare-themed dashboard UI

The system follows the exact specifications provided in the assignment, including file validation, REST API architecture, and SQLite persistence.

2. High-Level Architecture

The system follows a client–server architecture:
┌───────────────────┐        HTTP/JSON        ┌────────────────────┐
│     Frontend       │  <------------------>  │      Backend        │
│   React + Vite     │                        │ Express + Multer    │
└───────────────────┘                         └────────────────────┘
           │                                                │
           │                                                ▼
           │                                    ┌────────────────────┐
           │                                    │     SQLite DB       │
           │                                    │  documents table    │
           │                                    └────────────────────┘
           │                                                │
           ▼                                                ▼
   User uploads PDF                               File stored in /uploads

3. Technology Choices
Frontend

React (Vite): Fast development and modern tooling.

Tailwind CSS (CDN): Rapid UI styling without build complications.

React Router: Multi-page dashboard navigation.

Axios: For clean API communication.

Backend

Express.js: Lightweight server framework.

Multer: Handles file uploads, file size validation, and PDF MIME checks.

SQLite3: Zero-configuration embedded database with ACID compliance.

Why these choices?

Simple setup

Excellent performance

Easy to run for reviewers

Matches assignment requirements for a lightweight local database and REST API

4. Data Model

A single table: documents

Field	Type	Description
id	INTEGER PK	Unique identifier
filename	TEXT	Original file name
filepath	TEXT	Actual stored path (uploads/xxxx.pdf)
filesize	INTEGER	Size in bytes
created_at	TEXT	ISO timestamp

This aligns 100% with the assignment’s DB schema.

5. API Specification
POST /documents/upload

Upload a PDF file.

Request:

multipart/form-data

field: file

Validation:

Must be a PDF

File size ≤ 5MB
Response:
{
  "success": true,
  "document": {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 102400,
    "created_at": "2025-12-09T19:30:00Z"
  }
}

GET /documents

Fetch all uploaded documents.

Response:
[
  {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 102400,
    "created_at": "2025-12-09T19:30:00Z"
  }
]
GET /documents/:id

Downloads a specific file by ID.

DELETE /documents/:id

Deletes the file from:

SQLite table

/uploads directory

Response:
{ "success": true }
6. Detailed Flow
1. Upload Flow

User selects a PDF on the frontend.

React sends multipart/form-data to /documents/upload.

Multer stores the file in /backend/uploads.

Backend saves metadata in SQLite.

React updates the UI list.

2. Download Flow

User clicks “Download”.

Browser opens GET /documents/:id.

File served with proper MIME type.

3. Delete Flow

User clicks “Delete”.

React sends DELETE request.

Backend removes DB entry + file.

React refreshes the list.

7. Assumptions

Only one user uses the system → no login required (per assignment).

All uploads are PDF files ≤ 5MB.

Application runs locally (localhost).

Documents are personal health files like ID proofs, prescriptions, or test reports.

8. Non-Functional Considerations

Security: MIME type validation prevents malicious uploads.

Performance: SQLite is lightweight and optimized for local storage.

Maintainability: Clear separation of frontend & backend.

Scalability (Future): Could be upgraded to JWT auth + cloud storage.

9. Folder Structure
/backend
   index.js
   uploads/
   documents.db
   migrations/
       init.sql

/frontend
   src/
     components/
     pages/
     App.jsx
     main.jsx
   index.html
   
10. Conclusion
This design meets 100% of the functional and technical requirements of the assignment.
The frontend provides an enhanced healthcare dashboard UI, while the backend securely manages PDF documents and metadata.
