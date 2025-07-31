import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Strathmore Mental Health Triage System</h1>
          <p>Support is just a click away. Whether you're feeling overwhelmed, anxious, or just need someone to talk to — we're here for you.</p>
          <p className="helpline">📞 Helpline: <strong>0703 034 200</strong></p>
        </div>
      </section>

      <section className="services">
        <div className="service-card">
          <h2>📝 Self-Assessment</h2>
          <p>Answer a few short questions to help us guide you to the right support.</p>
          <Link to="/login">
            <button>Take Assessment</button>
          </Link>
        </div>

        <div className="service-card">
          <h2>📅 Book Appointment</h2>
          <p>Schedule a session with a mentor or psychologist at your convenience.</p>
          <Link to="/login">
            <button>Book Now</button>
          </Link>
        </div>

        <div className="service-card">
          <h2>📚 Mental Health Resources</h2>
          <p>Access helpful tools, videos, articles and self-care guides anytime.</p>
          <Link to="/resources">
            <button>Explore</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
