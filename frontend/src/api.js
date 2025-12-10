const API_BASE = "http://localhost:4000";

export async function uploadFile(file, onProgress) {
  const form = new FormData();
  form.append("file", file);

  // Using fetch; progress requires xhr — but we keep simple
  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({message: res.statusText}));
    throw new Error(err.message || "Upload failed");
  }
  return res.json();
}

export async function listDocuments() {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
}

export async function deleteDocument(id) {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({message: res.statusText}));
    throw new Error(err.message || "Delete failed");
  }
  return res.json();
}

// Force download via blob (prevents browser opening PDF in tab)
export async function downloadDocument(id, filename) {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  if (!res.ok) throw new Error("Failed to download");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "document.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
