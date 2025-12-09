// backend/index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { db, init } = require('./db');

// initialize DB (creates documents table if missing)
init();

const app = express();
app.use(cors());
app.use(express.json());

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// ensure uploads dir exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage config: save files in uploads/ with timestamp prefix
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    // safe filename: replace spaces with underscores
    const safe = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}_${safe}`);
  }
});

// Allowed mime types for PDF
const ALLOWED_MIMES = ['application/pdf', 'application/x-pdf'];

// Multer instance with file size limit 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    // Basic MIME type check
    if (!ALLOWED_MIMES.includes(file.mimetype)) {
      return cb(new Error('Only PDF files are allowed (invalid MIME type).'));
    }
    // Also simple extension check
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return cb(new Error('Only files with .pdf extension are allowed.'));
    }
    cb(null, true);
  }
}).single('file'); // field name expected from client: "file"

// Health route
app.get('/', (req, res) => res.json({ ok: true, message: 'Backend up' }));

/**
 * POST /documents/upload
 * Form field: 'file' (multipart/form-data)
 */
app.post('/documents/upload', (req, res) => {
  upload(req, res, (err) => {
    // Multer errors
    if (err) {
      // if it's a MulterError it has code property
      console.error('Upload error:', err);
      return res.status(400).json({ success: false, message: err.message || 'Upload error' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided. Use form field "file".' });
    }

    const now = new Date().toISOString();
    const { filename, path: filepath, size } = req.file;

    const insert = `INSERT INTO documents (filename, filepath, filesize, created_at)
                    VALUES (?, ?, ?, ?)`;

    db.run(insert, [filename, filepath, size, now], function(dbErr) {
      if (dbErr) {
        console.error('DB insert error:', dbErr);
        // attempt to remove the saved file if DB insert failed
        fs.unlink(filepath, () => {});
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      const id = this.lastID;
      return res.json({
        success: true,
        document: { id, filename, filesize: size, created_at: now }
      });
    });
  });
});

/**
 * GET /documents
 * Returns list of documents (id, filename, filesize, created_at)
 */
app.get('/documents', (req, res) => {
  const q = `SELECT id, filename, filesize, created_at FROM documents ORDER BY created_at DESC`;
  db.all(q, [], (err, rows) => {
    if (err) {
      console.error('DB fetch error:', err);
      return res.status(500).json({ success: false, message: 'DB error' });
    }
    res.json(rows);
  });
});

/**
 * GET /documents/:id
 * Streams the file as attachment for download
 */
app.get('/documents/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ success: false, message: 'Invalid id' });

  const q = `SELECT filename, filepath FROM documents WHERE id = ?`;
  db.get(q, [id], (err, row) => {
    if (err) {
      console.error('DB get error:', err);
      return res.status(500).json({ success: false, message: 'DB error' });
    }
    if (!row) return res.status(404).json({ success: false, message: 'Document not found' });

    // check file exists
    if (!fs.existsSync(row.filepath)) {
      return res.status(410).json({ success: false, message: 'File missing on server' });
    }

    // Res.download sets Content-Disposition header so browser downloads
    return res.download(row.filepath, row.filename, (downloadErr) => {
      if (downloadErr) {
        console.error('Download error:', downloadErr);
        // If headers already sent, can't send JSON; just log.
      }
    });
  });
});

/**
 * DELETE /documents/:id
 * Deletes both DB record and file from disk
 */
app.delete('/documents/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ success: false, message: 'Invalid id' });

  const q = `SELECT filepath FROM documents WHERE id = ?`;
  db.get(q, [id], (err, row) => {
    if (err) {
      console.error('DB get error:', err);
      return res.status(500).json({ success: false, message: 'DB error' });
    }
    if (!row) return res.status(404).json({ success: false, message: 'Document not found' });

    // try to unlink (ignore error if file missing)
    fs.unlink(row.filepath, (fsErr) => {
      if (fsErr && fsErr.code !== 'ENOENT') {
        console.error('File delete error:', fsErr);
        // still attempt to delete DB row even if file delete failed (optional)
      }

      const del = `DELETE FROM documents WHERE id = ?`;
      db.run(del, [id], function(delErr) {
        if (delErr) {
          console.error('DB delete error:', delErr);
          return res.status(500).json({ success: false, message: 'DB delete error' });
        }
        return res.json({ success: true, message: 'Deleted' });
      });
    });
  });
});

// global error handler (fallback)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
