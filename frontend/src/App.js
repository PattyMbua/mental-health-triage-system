import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardStudent from './pages/DashboardStudent';
import DashboardMentor from './pages/DashboardMentor';
import DashboardPsychologist from './pages/DashboardPsychologist';
import ScheduleAppointment from './components/ScheduleAppointment';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import AssessmentForm from './components/AssessmentForm';
import NotFound from './pages/NotFound';
import DashboardNavbar from './components/DashboardNavbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home as default */}
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<DashboardStudent />} />
        <Route path="/mentor-dashboard" element={<DashboardMentor />} />
        <Route path="/psychologist-dashboard" element={<DashboardPsychologist />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/assessment" element={<AssessmentForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
