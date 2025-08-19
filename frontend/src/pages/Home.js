import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login/student" className="nav-link">Take Assessment</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/faq" className="nav-link">FAQs</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Strathmore Mental Health Triage System</h1>
          <p>Your wellbeing matters. We're here to help — confidentially and professionally.</p>
          <p className="helpline">📞 Helpline: <strong>0703 034 200</strong></p>
        </div>
      </section>

      <section className="services">
        <div className="service-card">
          <h2>👨‍🎓 Student Login</h2>
          <p>Log in as a student to access triage, appointments, and resources.</p>
          <Link to="/login/student">
            <button className="home-button">Log In</button>
          </Link>
          <p className="signup-link">New? <Link to="/signup">Sign Up</Link></p>
        </div>

        <div className="service-card">
          <h2>👥 Mentor Login</h2>
          <p>Log in as a mentor to receive cases and track follow-ups.</p>
          <Link to="/login/mentor">
            <button className="home-button">Log In</button>
          </Link>
        </div>

        <div className="service-card">
          <h2>🩺 Psychologist Login</h2>
          <p>Log in as a psychologist to view notes and manage sessions.</p>
          <Link to="/login/psychologist">
            <button className="home-button">Log In</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;