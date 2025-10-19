import React, { useState } from "react";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question) return;
    setAnswer("Thinking...");
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      if (data.answer) setAnswer(data.answer);
      else setAnswer(data.error || "Something went wrong!");
    } catch (err) {
      setAnswer("Request failed: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Financial Literacy Chatbot 🤖</h1>
      <input
        type="text"
        placeholder="Ask me about money..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", borderRadius: "5px", marginRight: "1rem" }}
      />
      <button
        onClick={handleAsk}
        style={{ padding: "0.5rem 1rem", borderRadius: "5px", background: "#4a6cf7", color: "white", border: "none" }}
      >
        Ask
      </button>
      <p style={{ marginTop: "1rem", maxWidth: "600px", margin: "1rem auto" }}>{answer}</p>
    </div>
  );
}

export default Chatbot;
