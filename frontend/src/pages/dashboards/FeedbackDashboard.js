import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const BACKEND_URL = 'http://localhost:8000';

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/feedback/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(res => setFeedbacks(res.data))
    .catch(() => setFeedbacks([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/feedback/`, { message }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      if (response.data.success) {
        setFeedback('✅ Feedback submitted!');
        setMessage('');
        setFeedbacks([...feedbacks, response.data.feedback]);
      } else {
        setFeedback(`❌ ${response.data.error}`);
      }
    } catch (error) {
      setFeedback('❌ Error submitting feedback.');
    }
  };

  return (
    <div className="dashboard feedback-dashboard">
      <h2>Feedback Dashboard</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your feedback..."
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
      {feedback && <p className="feedback-message">{feedback}</p>}
      <ul className="feedback-list">
        {feedbacks.map(f => (
          <li key={f.id}>
            <strong>{f.student}</strong>: {f.message} <span className="date">{new Date(f.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDashboard;