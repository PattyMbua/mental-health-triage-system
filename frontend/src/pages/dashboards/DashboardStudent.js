import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaCalendarPlus, FaClipboardList } from 'react-icons/fa';
import './DashboardStudent.css'; // new styling file

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
      <DashboardNavbar user={{ name: "Student" }} />
      <div className="dashboard-content">
        <div className="dashboard-hero">
          <h2>Welcome, Student 👋</h2>
          <p>Manage your mental wellness and view session history.</p>
        </div>

        <div className="dashboard-actions">
          <Link to="/schedule" className="dashboard-card">
            <FaCalendarPlus size={28} />
            <span>Schedule a New Appointment</span>
          </Link>

          <Link to="/assessment" className="dashboard-card">
            <FaClipboardList size={28} />
            <span>Take Self-Assessment</span>
          </Link>
        </div>

        <div className="dashboard-sessions">
          <h3>Your Past Sessions</h3>
          {loading ? (
            <p>Loading sessions...</p>
          ) : (
            <ul>
              {sessions.map((session, index) => (
                <li key={index}>
                  <strong>Date:</strong> {session.date} <br />
                  <strong>With:</strong> {session.with} <br />
                  <strong>Feedback:</strong> {session.feedback}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardStudent;
