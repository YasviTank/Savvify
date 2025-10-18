import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // add this
import Chatbot from "./pages/Chatbot";

<Route path="/chatbot" element={<Chatbot />} />


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* add this */}
      </Routes>
    </Router>
  );
  <button 
  onClick={() => navigate("/chatbot")}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#4a6cf7",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
  }}
>
  💬
</button>

}

export default App;
