import React, { useEffect, useState } from "react";
import { listDocuments, deleteDocument, downloadDocument } from "../api";

export default function DocumentsList({ refreshToggle }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const data = await listDocuments();
      // backend might return { documents: [...] } or array directly — handle both
      setDocs(Array.isArray(data) ? data : (data.documents || []));
    } catch (err) {
      setMsg("Failed to load: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // refresh when parent toggles
  }, [refreshToggle]);

  async function handleDelete(id) {
    if (!confirm("Delete this file?")) return;
    try {
      await deleteDocument(id);
      setDocs(docs.filter(d => d.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  async function handleDownload(doc) {
    try {
      await downloadDocument(doc.id, doc.filename || "download.pdf");
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  }

  if (loading) return <div>Loading documents...</div>;

  return (
    <div>
      {msg && <div>{msg}</div>}
      {docs.length === 0 ? (
        <div>No documents uploaded yet.</div>
      ) : (
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
  <thead className="bg-blue-600 text-white">
    <tr>
      <th className="py-3 px-4 text-left">Filename</th>
      <th className="py-3 px-4 text-left">Size</th>
      <th className="py-3 px-4 text-left">Uploaded</th>
      <th className="py-3 px-4 text-center">Actions</th>
    </tr>
  </thead>

  <tbody>
    {docs.map(doc => (
      <tr key={doc.id} className="bg-white odd:bg-blue-50 hover:bg-blue-100 transition">
        <td className="py-3 px-4">{doc.filename}</td>
        <td className="py-3 px-4">{Math.round(doc.filesize/1024)} KB</td>
        <td className="py-3 px-4 text-gray-600">
          {new Date(doc.created_at).toLocaleString()}
        </td>
        <td className="py-3 px-4 flex justify-center gap-3">
          
          <button
            onClick={() => handleDownload(doc)}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-1"
          >
            ⬇ Download
          </button>

          <button
            onClick={() => handleDelete(doc.id)}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 shadow-sm flex items-center gap-1"
          >
            🗑 Delete
          </button>

        </td>
      </tr>
    ))}
  </tbody>

</table>
)}
    </div>
  );
}
