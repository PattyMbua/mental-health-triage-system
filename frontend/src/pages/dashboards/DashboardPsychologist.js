import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/navbars/DashboardNavbar";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaCheckCircle,
  FaTimesCircle,
  FaBookMedical,
} from "react-icons/fa";
import "./Dashboard.css";

const BACKEND_URL = "http://localhost:8000";

const DashboardPsychologist = () => {
  const [cases, setCases] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch assigned cases
    axios
      .get(`${BACKEND_URL}/api/psychologist/cases/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then((res) => setCases(res.data))
      .catch(() => setCases([]));

    // Fetch pending session requests
    axios
      .get(`${BACKEND_URL}/api/psychologist/requests/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div>
      <DashboardNavbar role="Psychologist" />

      <div className="dashboard-container" data-role="psychologist">
        <h2>👋 Welcome, Psychologist</h2>
        <p>
          Manage counseling sessions, accept/decline new requests, and track
          your assigned student cases.
        </p>

        {/* Dashboard cards */}
        <div className="dashboard-cards">
          <a href="/appointments" className="dashboard-card">
            <FaBookMedical className="icon" />
            <h3>Therapy Sessions</h3>
            <p>View all your counseling sessions</p>
          </a>

          <a href="/schedule" className="dashboard-card">
            <FaCalendarAlt className="icon" />
            <h3>Set Availability</h3>
            <p>Choose when students can book sessions with you</p>
          </a>

          <a href="/pending-requests" className="dashboard-card">
            <FaCheckCircle className="icon" />
            <h3>Pending Session Requests</h3>
            <p>Approve or decline new student session requests</p>
          </a>
        </div>

        {/* Pending Requests */}
        <section className="pending-requests">
          <h3>Pending Requests</h3>
          {requests.length > 0 ? (
            <ul>
              {requests.map((req) => (
                <li key={req.id}>
                  <strong>Student:</strong> {req.student} <br />
                  <strong>Requested Date:</strong> {req.date} <br />
                  <button className="btn-accept">
                    <FaCheckCircle /> Accept
                  </button>
                  <button className="btn-decline">
                    <FaTimesCircle /> Decline
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending requests.</p>
          )}
        </section>

        {/* Assigned Cases */}
        <h2>Assigned Cases</h2>
        <ul>
          {cases.map((c) => (
            <li key={c.id}>
              Student: {c.student} | Gender: {c.gender} | Diagnosis: {c.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPsychologist;
