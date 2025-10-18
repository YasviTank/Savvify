import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#4a6cf7", color: "white", display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>💰 Savify</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login/Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
