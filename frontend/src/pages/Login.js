import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const BACKEND_URL = 'http://localhost:8000';

const Login = () => {
  const [role, setRole] = useState('student'); // Default to student
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('authToken', data.token);

        setFeedback(`✅ Welcome, ${data.user.name || data.user.id}`);
        redirectToDashboard(data.user.role);
      } else {
        setFeedback(`❌ Login failed: ${data.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      setFeedback(`❌ Login failed: ${error.message || 'Network error'}`);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/google-login/`, {
        token: credentialResponse.credential,
      });
      if (response.data.success) {
        localStorage.setItem('authToken', credentialResponse.credential);
        setFeedback('✅ Google login successful!');
        redirectToDashboard('student');
      } else {
        setFeedback(`❌ Google login failed: ${response.data.error || 'Unknown error.'}`);
      }
    } catch (error) {
      setFeedback(`❌ Google login failed: ${error.response?.data?.error || error.message || 'Network error.'}`);
    }
  };

  const redirectToDashboard = (role) => {
    switch (role) {
      case 'student':
        window.location.href = '/student-dashboard';
        break;
      case 'mentor':
        window.location.href = '/mentor-dashboard';
        break;
      case 'psychologist':
        window.location.href = '/psychologist-dashboard';
        break;
      default:
        setFeedback('❌ Unknown role.');
    }
  };

  return (
    <div className="login-page">
      <div>
        <label>Select Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="psychologist">Psychologist</option>
        </select>
      </div>
      {role === 'student' ? (
        <div className="google-login-wrapper" style={{ marginTop: '1rem' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setFeedback('❌ Google login failed.')}
            useOneTap
            width="100%"
            shape="pill"
            theme="outline"
          />
          <p style={{ marginTop: '0.5rem' }}>Login with your Strathmore Google account</p>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label>Username or ID:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username or ID"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button type="submit">Login</button>
          {feedback && <p className="feedback">{feedback}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
