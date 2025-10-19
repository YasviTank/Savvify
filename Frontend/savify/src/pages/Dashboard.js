import React, { useState } from "react";

function Dashboard() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = () => {
    if (files.length === 0) return alert("No files selected!");
    console.log("Uploading files:", files);
    alert(`Uploading ${files.length} file(s): ${files.map(f => f.name).join(", ")}`);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "3rem 2rem",
      minHeight: "90vh",
      background: "linear-gradient(135deg, #121212, #1e1e1e)",
      color: "#f5f5f5",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Dashboard</h1>
      
      <div style={{
        background: "rgba(74,108,247,0.1)",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        maxWidth: "500px",
        width: "100%",
        margin: "1rem 0",
        textAlign: "center",
      }}>
        <h2>Welcome, User!</h2>
        <p>Upload your statement(s) and track your spending!</p>
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginTop: "1rem" }}
        />
        <button
          style={{
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            background: "#4a6cf7",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "1rem",
          }}
          onClick={handleUpload}
        >
          Upload PDFs
        </button>

        {files.length > 0 && (
          <div style={{ marginTop: "1rem", textAlign: "left" }}>
            <h4>Selected Files:</h4>
            <ul>
              {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
