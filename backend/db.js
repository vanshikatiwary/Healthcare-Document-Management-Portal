// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'documents.db');
const db = new sqlite3.Database(dbFile);

const init = () => {
  const createTable = `
  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    filesize INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );`;
  db.run(createTable, (err) => {
    if (err) console.error('Failed to create documents table:', err);
  });
};

module.exports = { db, init };
