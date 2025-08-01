import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Strathmore Mental Health Triage System</h1>
          <p>Your wellbeing matters. We're here to help — confidentially and professionally.</p>
          <p className="helpline">📞 Helpline: <strong>0703 034 200</strong></p>
        </div>
      </section>

      <section className="services">
        <div className="service-card">
          <h2>📝 Self-Assessment</h2>
          <p>Answer a few quick questions to find out what kind of support you may need.</p>
          <Link to="/login">
            <button className="home-button">Take Assessment</button>
          </Link>
        </div>

        <div className="service-card">
          <h2>📅 Book Appointment</h2>
          <p>Schedule a session with a mentor or psychologist who can help.</p>
          <Link to="/login">
            <button className="home-button">Book Now</button>
          </Link>
        </div>

        <div className="service-card">
          <h2>📚 Mental Health Resources</h2>
          <p>View articles, self-care tips, and wellness tools 24/7.</p>
          <Link to="/resources">
            <button className="home-button">Explore</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
