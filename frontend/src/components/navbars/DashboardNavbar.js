import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./DashboardNavbar.css";

const DashboardNavbar = ({ userProp }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = userProp || JSON.parse(localStorage.getItem('user')) || null;
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setOpen(false);
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
