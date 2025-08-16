// src/pages/dashboards/DashboardStudent.js
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaClipboardList, FaComments } from 'react-icons/fa';
import './Dashboard.css';

const DashboardStudent = () => {
  const handleGoogleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      console.log("✅ Logged in:", data);
      alert(`Welcome ${data.user.name}`);
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  return (
    <div>
      <DashboardNavbar role="Student" />
      <div className="dashboard-container">
        <h2>👋 Welcome, Student</h2>
        <p>Submit requests for mentoring or counseling, review appointments, and chat with assigned staff.</p>

        {/* Take Assessment Button */}
        <div style={{ margin: '20px 0' }}>
          <Link to="/assessment" className="dashboard-link">
            Take Assessment
          </Link>
        </div>

        {/* Google Sign-In Button */}
        <div style={{ margin: '20px 0' }}>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        </div>

        <div className="dashboard-cards">
          <a href="/new-request" className="dashboard-card">
            <FaClipboardList className="icon" />
            <h3>Submit Request</h3>
            <p>Fill a short form and your request will be sent to available mentors or psychologists.</p>
          </a>
          <a href="/my-appointments" className="dashboard-card">
            <FaComments className="icon" />
            <h3>My Appointments</h3>
            <p>View and manage your upcoming sessions.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
