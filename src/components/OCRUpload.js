import React, { useState } from "react";
import api from "../api/api";

const OCRUpload = ({ onExtract }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleExtractText = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    onExtract(formData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Upload Medical/Lifestyle Form (OCR)</h2>
        <div className="mb-3">
          <input className="form-control" type="file" onChange={handleFileChange} />
        </div>
        <button className="btn btn-secondary" onClick={handleExtractText} disabled={!image || loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            "Extract Text"
          )}
        </button>
      </div>
    </div>
  );
};

export default OCRUpload;