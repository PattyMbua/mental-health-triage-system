import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardMentor = () => {
  return (
    <div>
      <DashboardNavbar role="Mentor" />
      <div className="dashboard-content">
        <h2>👋 Welcome, Mentor</h2>
        {/* More mentor dashboard features here */}
      </div>
    </div>
  );
};

export default DashboardMentor;
