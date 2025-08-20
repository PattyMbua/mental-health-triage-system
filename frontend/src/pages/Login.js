import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const BACKEND_URL = "http://localhost:8000";

const Login = () => {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      // Add this line to verify the URL
      console.log(`${BACKEND_URL}/api/auth/student-login/`);
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/student-login/`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token || 'dummy-token');
        localStorage.setItem('userRole', 'student');
        setFeedback('✅ Login successful!');
        // Redirect to dashboard or reload
      } else {
        setFeedback(`❌ ${response.data.error}`);
      }
    } catch (error) {
      setFeedback('❌ Login failed.');
    }
  };

  return (
    <div className="login-page">
      {/* ...existing code for role selection and Google login... */}
      {role === 'student' && (
        <form onSubmit={handleStudentLogin} style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ marginRight: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ marginRight: '10px' }}
          />
          <button type="submit" className="login-btn">Login</button>
          {feedback && <p className="feedback">{feedback}</p>}
        </form>
      )}
      {/* ...existing code for other roles and styling... */}
    </div>
  );
};

export default Login;