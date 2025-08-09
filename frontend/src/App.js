// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ScheduleAppointment from './components/ScheduleAppointment';
import AssessmentForm from './components/AssessmentForm';

// adjust imports to reflect your folder moves:
import DashboardStudent from './pages/dashboards/DashboardStudent';
import DashboardMentor from './pages/dashboards/DashboardMentor';
import DashboardPsychologist from './pages/dashboards/DashboardPsychologist';

import Navbar from './components/navbars/Navbar'; // new path if moved

function AppWrapper() {
  const location = useLocation();
  // hide global navbar on any dashboard route (add others as needed)
  const hideGlobalNavbar = location.pathname.startsWith('/student-dashboard')
    || location.pathname.startsWith('/mentor-dashboard')
    || location.pathname.startsWith('/psychologist-dashboard');

  return (
    <>
      {!hideGlobalNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<DashboardStudent />} />
        <Route path="/mentor-dashboard" element={<DashboardMentor />} />
        <Route path="/psychologist-dashboard" element={<DashboardPsychologist />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assessment" element={<AssessmentForm />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
