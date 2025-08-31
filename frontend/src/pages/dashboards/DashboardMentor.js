
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaCalendarAlt, FaUserFriends, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';

const BACKEND_URL = 'http://localhost:8000';

const DashboardMentor = () => {
  const [sessions, setSessions] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch mentoring sessions
    axios.get(`${BACKEND_URL}/api/mentor/sessions/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(res => setSessions(res.data))
    .catch(() => setSessions([]));

    // Fetch pending requests
    axios.get(`${BACKEND_URL}/api/mentor/pending-requests/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(res => setPendingRequests(res.data))
    .catch(() => setPendingRequests([]));

    // Fetch assigned cases (legacy, if needed)
    axios.get(`${BACKEND_URL}/api/mentor/cases/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(res => setCases(res.data))
    .catch(() => setCases([]));
  }, []);

  const handleRequest = (id, action) => {
    setLoading(true);
    axios.post(`${BACKEND_URL}/api/mentor/request/${id}/`, { action }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(() => {
      // Refresh pending requests after action
      axios.get(`${BACKEND_URL}/api/mentor/pending-requests/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(res => setPendingRequests(res.data))
      .catch(() => setPendingRequests([]));
    })
    .finally(() => setLoading(false));
  };

  return (
    <div>
      <DashboardNavbar role="Mentor" />
      <div className="dashboard-container" data-role="mentor">
        <h2>👋 Welcome, Mentor</h2>
        <p>Review student sessions, offer guidance, and manage your availability.</p>

        <div className="dashboard-cards">
          {/* View Mentoring Sessions: Scroll to table below */}
          <a href="#mentoring-sessions" className="dashboard-card">
            <FaUserFriends className="icon" />
            <h3>View Mentoring Sessions</h3>
          </a>
          <a href="/schedule" className="dashboard-card">
            <FaCalendarAlt className="icon" />
            <h3>Set Available Slots</h3>
          </a>
          <a href="#pending-requests" className="dashboard-card">
            <FaCheckCircle className="icon" />
            <h3>Pending Session Requests</h3>
            <p>Accept or decline new session requests</p>
          </a>
        </div>

        <section id="pending-requests" className="pending-requests">
          <h3>Pending Requests</h3>
          <ul>
            {pendingRequests.length === 0 && <li>No pending requests.</li>}
            {pendingRequests.map(req => (
              <li key={req.id}>
                <strong>Student:</strong> {req.student_name} <br />
                <strong>Requested Date:</strong> {new Date(req.requested_date).toLocaleString()} <br />
                <button className="btn-accept" disabled={loading} onClick={() => handleRequest(req.id, 'accept')}><FaCheckCircle /> Accept</button>
                <button className="btn-decline" disabled={loading} onClick={() => handleRequest(req.id, 'decline')}><FaTimesCircle /> Decline</button>
              </li>
            ))}
          </ul>
        </section>

        <h2 id="mentoring-sessions">Mentoring Sessions</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr><td colSpan="3">No mentoring sessions found.</td></tr>
            ) : (
              sessions.map(s => (
                <tr key={s.id}>
                  <td>{s.student_name}</td>
                  <td>{new Date(s.requested_date).toLocaleString()}</td>
                  <td>{s.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2>Assigned Cases</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Gender</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <tr><td colSpan="3">No assigned cases found.</td></tr>
            ) : (
              cases.map(c => (
                <tr key={c.id}>
                  <td>{c.student}</td>
                  <td>{c.gender}</td>
                  <td>{c.result}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMentor;
