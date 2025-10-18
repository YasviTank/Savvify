import React, { useState } from "react";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask me anything about money or finance!");
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("Thinking...");
    try {
      const response = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer || "No response");
    } catch (err) {
      setAnswer("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem", minHeight: "100vh" }}>
      <h1 style={{ color: "#4a6cf7" }}>💬 Financial Literacy Assistant</h1>
      <p style={{ color: "#ccc" }}>Ask about budgeting, saving, investing, or spending wisely!</p>

      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Ask me about money..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askBot()}
          style={{
            width: "60%",
            padding: "0.8rem",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={askBot}
          style={{
            marginLeft: "1rem",
            padding: "0.8rem 1.5rem",
            background: "#4a6cf7",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Ask
        </button>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          display: "inline-block",
          maxWidth: "60%",
          color: "#f5f5f5",
          fontSize: "1.1rem",
          lineHeight: "1.5",
        }}
      >
        {loading ? "Thinking..." : answer}
      </div>
    </div>
  );
}

export default Chatbot;
