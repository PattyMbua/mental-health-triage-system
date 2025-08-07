// src/components/DashboardNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const DashboardNavbar = ({ role }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-navbar">
      <div className="dashboard-logo">Mental Health System ({role})</div>
      <ul className="dashboard-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/assessment">Assessment</Link></li>
        <li><button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
