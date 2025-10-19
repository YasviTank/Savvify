import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files selected!");
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
  
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Upload failed");
  
      const data = await response.json();
      alert(data.message);
      console.log("Uploaded files:", data.files);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed! Check backend connection.");
    }
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 2rem",
        minHeight: "90vh",
        background: "linear-gradient(135deg, #121212, #1e1e1e)",
        color: "#f5f5f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Dashboard</h1>

      <div
        style={{
          background: "rgba(74,108,247,0.1)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          maxWidth: "500px",
          width: "100%",
          margin: "1rem 0",
          textAlign: "center",
        }}
      >
        <h2>Welcome, User!</h2>
        <p>Upload your statement(s) and track your spending!</p>
        <input
          type="file"
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
          Upload PDF
        </button>
      </div>

      {/* 🧾 Show Chart */}
      {chartData && (
        <div
          style={{
            marginTop: "2rem",
            width: "600px",
            background: "#222",
            padding: "1.5rem",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Expense Breakdown</h3>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
