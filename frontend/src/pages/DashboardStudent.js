// src/components/DashboardStudent.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
// import './Dashboard.css';

const DashboardStudent = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mockBackend.json')
      .then((res) => res.json())
      .then((data) => {
        const studentSessions = data.sessions.filter(s => s.studentId === 'STU123');
        setSessions(studentSessions);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <DashboardNavbar role="Student" />
      <div className="dashboard-content">
        <h2>Welcome, Student 👋</h2>
        <p>Manage your mental wellness and view session history.</p>

        <div style={{ marginTop: '2em' }}>
          <Link to="/schedule" className="dashboard-link">+ Schedule a New Appointment</Link>
          <Link to="/assessment" className="dashboard-link">+ Take Self-Assessment</Link>
        </div>

        <h3>Your Past Sessions</h3>
        {loading ? (
          <p>Loading sessions...</p>
        ) : (
          <ul className="session-list">
            {sessions.map((session, index) => (
              <li key={index} className="session-item">
                <strong>Date:</strong> {session.date}<br />
                <strong>With:</strong> {session.with}<br />
                <strong>Feedback:</strong> {session.feedback}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DashboardStudent;
