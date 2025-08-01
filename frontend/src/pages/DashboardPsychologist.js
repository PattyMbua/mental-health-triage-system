import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPsychologist = () => {
  return (
    <div className="dashboard-psychologist">
      <h1>Psychologist Dashboard</h1>
      <p>Manage clinical cases and your availability.</p>
      <ul>
        <li><Link to="/schedule">Set Appointment Slots</Link></li>
        <li><Link to="/appointments">View Scheduled Sessions</Link></li>
      </ul>
    </div>
  );
};

export default DashboardPsychologist;
