// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ScheduleAppointment from './components/ScheduleAppointment';
import AssessmentForm from './components/AssessmentForm';
import Feedback from './components/feedback/Feedback';
import DashboardMentor from './pages/dashboards/DashboardMentor';
import DashboardPsychologist from './pages/dashboards/DashboardPsychologist';
import DashboardStudent from './pages/dashboards/DashboardStudent';


import Navbar from './components/navbars/Navbar';

function AppWrapper() {
  const location = useLocation();

  // hide global navbar on all dashboards
  const hideNavbar =
    location.pathname.startsWith('/dashboardStudent') ||
    location.pathname.startsWith('/dashboardMentor') ||
    location.pathname.startsWith('/dashboardPsychologist');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assessment" element={<AssessmentForm />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboardStudent" element={<DashboardStudent/>}/>
        <Route path="/dashboardMentor" element={<DashboardMentor/>}/>
         <Route path="/dashboardPsychologist" element={<DashboardPsychologist/>}/>
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
