import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const DashboardPsychologist = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/psychologist/cases/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(res => setCases(res.data))
    .catch(() => setCases([]));
  }, []);

  return (
    <div>
      <h2>Assigned Cases</h2>
      <ul>
        {cases.map(c => (
          <li key={c.id}>
            Student: {c.student} | Gender: {c.gender} | Result: {c.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPsychologist;
