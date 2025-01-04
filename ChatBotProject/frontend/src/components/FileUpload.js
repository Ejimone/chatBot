import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onTextExtracted }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onTextExtracted(response.data.text);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file");
    }
    setLoading(false);
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {" "}
        {loading ? "Uploading..." : "Upload PDF"}{" "}
      </button>
    </div>
  );
};

export default FileUpload;
