import React, { useState } from 'react';
import './ScheduleAppointment.css';
import bannerImg from '../assets/schedule-banner.jpg';

const ScheduleAppointment = () => {
  const [urgency, setUrgency] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking submitted!\nUrgency: ${urgency}\nNotes: ${notes}`);
  };

  return (
    <div className="schedule-container">
      <img src={bannerImg} alt="Schedule Appointment" className="banner-img" />
      <h2>Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Urgency:
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
            <option value="">--Choose--</option>
            <option value="non-clinical">Non-clinical (e.g. stress, academic pressure)</option>
            <option value="clinical">Clinical (e.g. anxiety, depression)</option>
          </select>
        </label>

        <label>
          Briefly describe your concern:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            placeholder="Type here..."
            rows={4}
          />
        </label>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;
