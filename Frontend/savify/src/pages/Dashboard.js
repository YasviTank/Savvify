import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const user = location.state || { name: "User", surname: "", age: "" };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Dashboard</h1>
      <p>Hi {user.name} {user.surname}! Age: {user.age}</p>
      <p>Upload your statement and track your spending here soon!</p>
    </div>
  );
}

export default Dashboard;
