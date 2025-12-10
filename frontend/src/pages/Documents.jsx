import { useState } from "react";
import UploadForm from "../components/UploadForm";
import DocumentsList from "../components/DocumentsList";

export default function Documents() {
  const [toggle, setToggle] = useState(0);

  return (
    <div className="ml-72 pt-24 px-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Patient Documents
      </h1>

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl p-10 mb-10">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <span>📄</span> Upload Medical Document
        </h2>

        <div className="border-2 border-dashed border-blue-300 rounded-xl bg-blue-50 p-8">
          <UploadForm onUploaded={() => setToggle((t) => t + 1)} />
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <span>📁</span> Your Documents
        </h2>

        <DocumentsList refreshToggle={toggle} />
      </div>
    </div>
  );
}
