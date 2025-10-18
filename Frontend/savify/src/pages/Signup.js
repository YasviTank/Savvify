import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard", { state: { name, surname, age } });
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const formStyle = {
    backgroundColor: "#1e1e1e",
    padding: "3rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    width: "350px",
    textAlign: "center",
    color: "#fff",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    outline: "none",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    marginTop: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#444",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    backgroundColor: "#666",
  };

  const linkStyle = {
    color: "#aaa",
    cursor: "pointer",
    textDecoration: "underline",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSignup} style={formStyle}>
        <h1 style={{ marginBottom: "1.5rem" }}>Signup</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Signup
        </button>
        <p style={{ marginTop: "1rem", color: "#ccc" }}>
          Already have an account?{" "}
          <span style={linkStyle} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
