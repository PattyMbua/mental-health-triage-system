// src/pages/DashboardStudent.js
import React from 'react';
import DashboardNavbar from '../../components/navbars/DashboardNavbar';
import { FaClipboardList, FaComments } from 'react-icons/fa';
import './Dashboard.css';

const DashboardStudent = () => {
  return (
    <div>
      <DashboardNavbar role="Student" />
      <div className="dashboard-container">
        <h2>👋 Welcome, Student</h2>
        <p>Submit requests for mentoring or counseling, review appointments, and chat with assigned staff.</p>

        <div className="dashboard-cards">
          <a href="/new-request" className="dashboard-card">
            <FaClipboardList className="icon" />
            <h3>Submit Request</h3>
            <p>Fill a short form and your request will be sent to available mentors or psychologists.</p>
          </a>
          <a href="/my-appointments" className="dashboard-card">
            <FaComments className="icon" />
            <h3>My Appointments</h3>
            <p>View and manage your upcoming sessions.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
