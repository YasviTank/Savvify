import React, { useState } from "react";

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
        const response = await fetch("http://127.0.0.1:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: input }),
          });
          
          const data = await response.json();
          const botMessage = { sender: "bot", text: data.answer }; // <-- this will now always work
          setMessages((prev) => [...prev, botMessage]);
          
          
    } catch (err) {
      const botMessage = { sender: "bot", text: "Error connecting to server." };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#4a6cf7",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
        }}
      >
        💬
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: 0,
            width: "90vw",
            maxWidth: "400px",
            maxHeight: "500px",
            background: "rgba(30,30,30,0.95)",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: "0.5rem",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.sender === "user" ? "right" : "left",
                  margin: "0.5rem 0",
                }}
              >
                <span
                  style={{
                    background: m.sender === "user" ? "#4a6cf7" : "#333",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    display: "inline-block",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "8px 0 0 8px",
                border: "none",
                outline: "none",
                background: "#222",
                color: "#fff",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0 8px 8px 0",
                background: "#4a6cf7",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotWidget;
