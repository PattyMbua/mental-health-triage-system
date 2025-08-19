// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StudentLogin from './pages/StudentLogin';
import MentorLogin from './pages/MentorLogin';
import PsychologistLogin from './pages/PsychologistLogin';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ScheduleAppointment from './components/ScheduleAppointment';
import AssessmentForm from './components/AssessmentForm';
import Feedback from './components/feedback/Feedback';
import DashboardMentor from './pages/dashboards/DashboardMentor';
import DashboardPsychologist from './pages/dashboards/DashboardPsychologist';
import DashboardStudent from './pages/dashboards/DashboardStudent';
import Signup from './pages/Signup';



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
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assessment" element={<AssessmentForm />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboardStudent" element={<DashboardStudent/>}/>
        <Route path="/dashboardMentor" element={<DashboardMentor/>}/>
         <Route path="/dashboardPsychologist" element={<DashboardPsychologist/>}/>
         <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/mentor" element={<MentorLogin />} />
        <Route path="/login/psychologist" element={<PsychologistLogin />} />
        <Route path="/signUp" element={<Signup />} />
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
