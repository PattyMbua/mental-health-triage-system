// src/components/DashboardStudent.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // optional styling

const DashboardStudent = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Mock fetch from backend (replace with API call later)
    fetch('/mockBackend.json')
      .then((res) => res.json())
      .then((data) => {
        const studentSessions = data.sessions.filter(s => s.studentId === 'STU123'); // hardcoded for demo
        setSessions(studentSessions);
      });
  }, []);

  return (
    <div className="dashboard-student">
      <h2>Welcome, Student</h2>
      <p>View your past sessions and manage your mental wellness here.</p>

      <h3>Your Past Sessions</h3>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            <strong>Date:</strong> {session.date}<br />
            <strong>With:</strong> {session.with}<br />
            <strong>Feedback:</strong> {session.feedback}
          </li>
        ))}
      </ul>

      <a href="/schedule" style={{ color: '#4682B4', textDecoration: 'underline' }}>
        + Schedule a New Appointment
      </a>
    </div>
  );
};

export default DashboardStudent;
