import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaCalendarAlt, FaUserFriends, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';

const BACKEND_URL = 'http://localhost:8000';

const DashboardMentor = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/mentor/cases/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(res => setCases(res.data))
    .catch(() => setCases([]));
  }, []);

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

        <h2>Assigned Cases</h2>
        <ul>
          {cases.map(c => (
            <li key={c.id}>
              Student: {c.student} | Gender: {c.gender} | Result: {c.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardMentor;
