import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaWallet, FaLightbulb } from "react-icons/fa";
import Chart from "chart.js/auto";
import "./Home.css";

function Home() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const runSimulation = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/simulate"); // Flask backend
        const data = await response.json();

        // Destroy previous chart
        if (chartInstance.current) chartInstance.current.destroy();

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.months,
            datasets: [
              {
                label: "Savings",
                data: data.savings,
                borderColor: "green",
                fill: false,
              },
              {
                label: "Debt",
                data: data.debt,
                borderColor: "red",
                fill: false,
              },
              {
                label: "Monthly Payment",
                data: data.monthly_payments,
                borderColor: "blue",
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { y: { beginAtZero: true } },
          },
        });
      } catch (err) {
        console.error("Error fetching simulation data:", err);
      }
    };

    runSimulation();
  }, []);

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
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
          <div className="triangle triangle1"></div>
          <div className="triangle triangle2"></div>
          <div className="square square1"></div>
          <div className="square square2"></div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <h2>Debt & Savings Simulation</h2>
        <canvas ref={chartRef} width="600" height="400"></canvas>
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