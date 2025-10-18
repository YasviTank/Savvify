import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    padding: "1rem 2rem",
    backgroundColor: "#1e1e1e", // dark-neutral background
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const linkStyle = {
    color: "#ccc", // light grey links
    textDecoration: "none",
    marginLeft: "1rem",
    transition: "all 0.3s ease",
  };

  const linkHover = {
    color: "#fff", // white on hover
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>💰 Savify</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Login/Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
