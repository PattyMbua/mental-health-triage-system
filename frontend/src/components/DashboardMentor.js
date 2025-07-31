import React from 'react';
import { Link } from 'react-router-dom';

const DashboardMentor = () => {
  return (
    <div className="dashboard-mentor">
      <h1>Mentor Dashboard</h1>
      <p>Welcome Mentor, manage your mentees here.</p>
      <ul>
        <li><Link to="/schedule">Set Availability</Link></li>
        <li><Link to="/appointments">View Scheduled Sessions</Link></li>
      </ul>
    </div>
  );
};

export default DashboardMentor;
