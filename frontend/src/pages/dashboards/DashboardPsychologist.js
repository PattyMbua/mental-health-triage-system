// src/pages/DashboardPsychologist.js
import React from 'react';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';

const DashboardPsychologist = () => {
  return (
    <div>
      <DashboardNavbar role="Psychologist" />
      <div className="dashboard-content">
        <h2>🧠 Psychologist Dashboard</h2>
        <p>Manage clinical cases, review notes, and handle appointments.</p>
        <ul>
          <li><a href="/appointments">View Clinical Sessions</a></li>
          <li><a href="/schedule">Set Appointment Slots</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPsychologist;
