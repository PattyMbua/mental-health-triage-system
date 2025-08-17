import React, { useState } from 'react';
import axios from 'axios';
import './Assessment.css';

const BACKEND_URL = 'http://localhost:8000';

const AssessmentForm = () => {
  const [answers, setAnswers] = useState({ q1: 0, q2: 0, q3: 0, q4: 0 });
  const [result, setResult] = useState('');
  const [gender, setGender] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    let assessmentResult;
    if (score <= 2) {
      assessmentResult = "Refer to Mentor (Non-clinical support)";
    } else {
      assessmentResult = "Refer to Psychologist (Clinical support)";
    }
    setResult(assessmentResult);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setFeedback('❌ You must log in as a student before submitting.');
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL}/api/assessment/submit/`,
        { gender, result: assessmentResult },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setFeedback('✅ Assessment submitted successfully!');
      } else {
        setFeedback(`❌ ${response.data.error || 'Submission failed.'}`);
      }
    } catch (error) {
      setFeedback(`❌ ${error.response?.data?.error || 'Error submitting assessment.'}`);
    }
  };

  return (
    <div className="assessment-container">
      <form onSubmit={handleSubmit}>
        <label>1. How often have you felt anxious this week?</label>
        <select name="q1" onChange={handleChange}>
          <option value="0">Not at all</option>
          <option value="1">Sometimes</option>
          <option value="2">Often</option>
        </select>

        <label>2. Are you sleeping well?</label>
        <select name="q2" onChange={handleChange}>
          <option value="0">Yes</option>
          <option value="1">Somewhat</option>
          <option value="2">No</option>
        </select>

        <label>3. Are you feeling hopeful about the future?</label>
        <select name="q3" onChange={handleChange}>
          <option value="0">Yes</option>
          <option value="1">Not Sure</option>
          <option value="2">No</option>
        </select>

        <label>4. Do you feel supported by friends or family?</label>
        <select name="q4" onChange={handleChange}>
          <option value="0">Yes</option>
          <option value="1">Somewhat</option>
          <option value="2">No</option>
        </select>

        <label>Gender:</label>
        <select value={gender} onChange={e => setGender(e.target.value)} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Submit Assessment</button>
        {result && <p className="result">{result}</p>}
        {feedback && <p className="feedback">{feedback}</p>}
      </form>
    </div>
  );
};

export default AssessmentForm;
