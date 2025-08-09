// src/components/navbars/DashboardNavbar.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./DashboardNavbar.css";

const DashboardNavbar = ({ userProp }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // get user from prop or fallback to localStorage
  const user = userProp || JSON.parse(localStorage.getItem('user')) || null;
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "";

  const handleLogout = () => {
    // clear auth tokens and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // if you have cookies/session, optionally hit API logout endpoint
    navigate('/login', { replace: true });
  };

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-left">
        <div className="dashboard-logo">Dashboard</div>
      </div>

      <div className="dashboard-right">
        <div className="welcome">{user ? `Welcome, ${user.name}` : "Welcome"}</div>

        <div className="user-dropdown">
          <button className="avatar-btn" onClick={() => setOpen(!open)}>
            {firstLetter || 'U'}
          </button>

          {open && (
            <ul className="dropdown-menu" onMouseLeave={() => setOpen(false)}>
              <li><button onClick={() => { navigate('/profile'); setOpen(false); }}>Profile</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
