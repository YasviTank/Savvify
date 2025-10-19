import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navStyle = {
    padding: "1rem 2rem",
    backgroundColor: "rgba(30,30,30,0.85)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    transition: "all 0.3s ease",
    position: "relative",
  };

  const linkHover = {
    color: "#fff",
    transform: "scale(1.05)",
  };

  const activeStyle = {
    color: "#fff",
    fontWeight: 600,
    borderBottom: "2px solid #4a6cf7",
    paddingBottom: "2px",
  };

  // Add Learn page link
  const paths = ["/", "/dashboard", "/learn", "/login"];
  const names = ["Home", "Dashboard", "Learn", "Login/Signup"];

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>💸 Savvify</div>
      <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
        {paths.map((path, index) => (
          <Link
            key={index}
            to={path}
            style={location.pathname === path ? { ...linkStyle, ...activeStyle } : linkStyle}
            onMouseOver={(e) => {
              e.target.style.color = linkHover.color;
              e.target.style.transform = linkHover.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.color = location.pathname === path ? "#fff" : "#ccc";
              e.target.style.transform = "scale(1)";
            }}
          >
            {names[index]}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
