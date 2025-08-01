import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardNavbar.css';

const DashboardNavbar = ({ role }) => {
  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-logo">SUMC | {role} Dashboard</div>
      <ul className="dashboard-links">
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/resources">📚 Resources</Link></li>
        <li><Link to="/login">🚪 Logout</Link></li>
      </ul>
    </nav>
  );
};

export default DashboardNavbar;
