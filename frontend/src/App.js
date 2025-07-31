import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import DashboardStudent from './components/DashboardStudent';
import DashboardMentor from './components/DashboardMentor';
import DashboardPsychologist from './components/DashboardPsychologist';
import ScheduleAppointment from './components/ScheduleAppointment';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<DashboardStudent />} />
        <Route path="/mentor-dashboard" element={<DashboardMentor />} />
        <Route path="/psychologist-dashboard" element={<DashboardPsychologist />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;
