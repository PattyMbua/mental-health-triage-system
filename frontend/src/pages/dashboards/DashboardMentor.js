import React from 'react';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaCalendarAlt, FaUserFriends, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';

const DashboardMentor = () => {
  return (
    <div>
      <DashboardNavbar role="Mentor" />
      <div className="dashboard-container" data-role="mentor">
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
          <a href="/pending-requests" className="dashboard-card">
            <FaCheckCircle className="icon" />
            <h3>Pending Session Requests</h3>
            <p>Accept or decline new session requests</p>
          </a>
        </div>

        <section className="pending-requests">
          <h3>Pending Requests</h3>
          <ul>
            <li>
              <strong>Student:</strong> Jane Doe <br />
              <strong>Requested Date:</strong> Aug 15, 2025 <br />
              <button className="btn-accept"><FaCheckCircle /> Accept</button>
              <button className="btn-decline"><FaTimesCircle /> Decline</button>
            </li>
            {/* Add dynamic data here */}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DashboardMentor;
