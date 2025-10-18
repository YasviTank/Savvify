import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const user = location.state || { name: "User", surname: "", age: "" };

  const dashboardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 2rem",
    minHeight: "90vh",
    background: "linear-gradient(135deg, #121212, #1e1e1e)",
    color: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "rgba(74,108,247,0.1)",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    maxWidth: "500px",
    width: "100%",
    margin: "1rem 0",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    background: "#4a6cf7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Dashboard</h1>
      <div style={cardStyle}>
        <h2>Welcome, {user.name} {user.surname}!</h2>
        <p>Age: {user.age}</p>
      </div>
      <div style={cardStyle}>
        <p>Upload your statement and track your spending here soon!</p>
        <button style={buttonStyle}>Upload Statement (Coming Soon)</button>
      </div>
    </div>
  );
}

export default Dashboard;
