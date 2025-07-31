import React, { useState } from 'react';

export default function AssessmentForm() {
  const [answers, setAnswers] = useState({ q1: 0, q2: 0, q3: 0 });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = () => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    if (score <= 2) setResult("Refer to Mentor (Non-clinical support)");
    else setResult("Refer to Psychologist (Clinical support)");
  };

  return (
    <div className="assessment">
      <h2>Quick Mental Health Check</h2>
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

      <button onClick={handleSubmit}>Submit</button>
      {result && <p><strong>{result}</strong></p>}
    </div>
  );
}
