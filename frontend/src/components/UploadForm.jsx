import React, { useState } from "react";
import { uploadFile } from "../api";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  function handleFile(e) {
    setMsg(null);
    const f = e.target.files[0];
    if (!f) return setFile(null);
    if (f.type !== "application/pdf") {
      setMsg("Only PDF files are allowed.");
      setFile(null);
      return;
    }
    if (f.size > MAX_SIZE) {
      setMsg("File is too large. Max 5 MB.");
      setFile(null);
      return;
    }
    setFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    if (!file) return setMsg("Please choose a valid PDF.");
    setLoading(true);
    try {
      const res = await uploadFile(file);
      setMsg("Upload successful.");
      setFile(null);
      e.target.reset();
      if (onUploaded) onUploaded(res);
    } catch (err) {
      setMsg("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
  
  <label className="block text-blue-800 font-medium">
    Select or drag-and-drop a PDF (max 5MB)
  </label>

  <div className="flex items-center gap-4">
    <input
      type="file"
      accept="application/pdf"
      onChange={handleFile}
      className="block w-full text-sm bg-white border border-gray-300 
                 rounded-lg p-3 shadow-sm cursor-pointer"
    />

    <button
      type="submit"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow 
                 hover:bg-blue-700 hover:shadow-lg active:scale-95 
                 transition-all flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" viewBox="0 0 24 24" 
           strokeWidth={1.5} 
           stroke="currentColor" 
           className="w-5 h-5">
        <path strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5
                 A2.25 2.25 0 0021 18.75V16.5m-9-13.5v15m0 0l-6-6m6 6l6-6" />
      </svg>
      Upload
    </button>
  </div>

  {msg && (
    <div className={`font-medium ${msg.includes("successful") 
      ? "text-green-600" 
      : "text-red-600"}`}>
      {msg}
    </div>
  )}
</form>

  );
}
