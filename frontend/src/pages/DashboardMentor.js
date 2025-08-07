// src/pages/DashboardMentor.js
import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardMentor = () => {
  return (
    <div>
      <DashboardNavbar role="Mentor" />
      <div className="dashboard-content">
        <h2>👋 Welcome, Mentor</h2>
        <p>Review student sessions, offer guidance, and manage your availability.</p>
        <ul>
          <li><a href="/appointments">View Mentoring Sessions</a></li>
          <li><a href="/schedule">Set Available Slots</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardMentor;
