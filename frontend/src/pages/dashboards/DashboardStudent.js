import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaClipboardList, FaComments } from 'react-icons/fa';
import './DashboardStudent.css';
import Feedback from '../../components/feedback/Feedback';

<button 
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
  style={{ float: "right", padding: "0.5rem 1rem", margin: "1rem", cursor: "pointer" }}
>
  Logout
</button>

const DashboardStudent = () => {
  return (
    <div>
      <DashboardNavbar role="Student" isLoggedIn={!!localStorage.getItem("token")} />
      <div className="dashboard-container">
        <h2>👋 Welcome, {localStorage.getItem("name") || "Student"}</h2>
        <p>Submit requests for mentoring or counseling, review appointments, and chat with assigned staff.</p>

        <div className="dashboard-cards">
          <Link to="/assessment" className="dashboard-card">
            <FaClipboardList className="icon" />
            <h3>Take Assessment</h3>
            <p>Start your assessment to help the system understand your mental health needs.</p>
          </Link>
          <Link to="/schedule" className="dashboard-card">
            <FaComments className="icon" />
            <h3>My Appointments</h3>
            <p>View and manage your upcoming sessions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
