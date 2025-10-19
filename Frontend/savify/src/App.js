import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // add this
import Chatbot from "./pages/Chatbot";
import ChatbotWidget from "./components/ChatbotWidget"; // import the widget



// inside <Routes>
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
        {/* <Route path  */}
      </Routes>

      {/* Include chatbot here so it floats on all pages */}
      <ChatbotWidget />
    </Router>
  );
}


export default App;
