// src/pages/DashboardMentor.js
import React from 'react';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import './Dashboard.css'; // We'll create this

const DashboardMentor = () => {
  return (
    <div>
      <DashboardNavbar role="Mentor" />
      <div className="dashboard-container">
        <h2>👋 Welcome, Mentor</h2>
        <p>Review student sessions, offer guidance, and manage your availability.</p>

        <div className="dashboard-cards">
          <a href="/appointments" className="dashboard-card">
            <FaUserFriends className="icon" />
            <h3>View Mentoring Sessions</h3>
          </a>
          <a href="/schedule" className="dashboard-card">
            <FaCalendarAlt className="icon" />
            <h3>Set Available Slots</h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardMentor;
