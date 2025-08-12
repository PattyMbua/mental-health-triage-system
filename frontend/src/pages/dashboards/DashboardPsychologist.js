import React from 'react';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaCalendarAlt, FaNotesMedical, FaUserMd } from 'react-icons/fa';
import './Dashboard.css';

const DashboardPsychologist = () => {
  return (
    <div>
      <DashboardNavbar role="Psychologist" />
      <div className="dashboard-container" data-role="psychologist">
        <h2>🧠 Psychologist Dashboard</h2>
        <p>Manage clinical cases, review notes, and handle appointments.</p>

        <div className="dashboard-cards">
          <a href="/appointments" className="dashboard-card">
            <FaUserMd className="icon" />
            <h3>View Clinical Sessions</h3>
          </a>
          <a href="/schedule" className="dashboard-card">
            <FaCalendarAlt className="icon" />
            <h3>Set Appointment Slots</h3>
          </a>
          <a href="/clinical-notes" className="dashboard-card">
            <FaNotesMedical className="icon" />
            <h3>Review Session Notes</h3>
            <p>Access detailed clinical case notes</p>
          </a>
        </div>

        <section className="upcoming-sessions">
          <h3>Upcoming Sessions</h3>
          <ul>
            <li>
              <strong>Student:</strong> John Smith <br />
              <strong>Date & Time:</strong> Aug 16, 2025, 10:00 AM <br />
              <a href="/session/123">View Details</a>
            </li>
            {/* Add dynamic data here */}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DashboardPsychologist;
