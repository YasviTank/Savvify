import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaWallet, FaLightbulb } from "react-icons/fa";
import "./Home.css"; // We'll add styling here

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Savify 💸</h1>
          <p>
            Understand your spending, visualize your habits, and grow your
            financial literacy.
          </p>
          <Link to="/login">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
        <div className="hero-animation">
          {/* Floating shapes for subtle animation */}
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <FaWallet size={40} />
            <h3>Track Spending</h3>
            <p>Keep a close eye on your expenses and stay in control.</p>
          </div>
          <div className="feature-card">
            <FaChartLine size={40} />
            <h3>Visualize Habits</h3>
            <p>See patterns in your spending to make smarter decisions.</p>
          </div>
          <div className="feature-card">
            <FaLightbulb size={40} />
            <h3>Get Insights</h3>
            <p>Receive actionable tips to improve your financial health.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Savify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
