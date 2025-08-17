import React, { useState } from 'react';
import './ScheduleAppointment.css';
import bannerImg from '../assets/schedule-banner.jpg';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const ScheduleAppointment = () => {
  const [urgency, setUrgency] = useState('');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/appointment/`,
        { urgency, notes },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      if (response.data.success) {
        setFeedback('✅ Appointment booked successfully!');
        setUrgency('');
        setNotes('');
      } else {
        setFeedback(`❌ ${response.data.error || 'Booking failed.'}`);
      }
    } catch (error) {
      setFeedback('❌ Error booking appointment.');
    }
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
        {feedback && <p className="feedback">{feedback}</p>}
      </form>
    </div>
  );
};

export default ScheduleAppointment;
