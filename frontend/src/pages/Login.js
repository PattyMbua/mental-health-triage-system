import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password
      });

      if (res.data.success) {
        setFeedback(`✅ Welcome, ${res.data.username}`);
        // Redirect based on role
        if (res.data.role === 'student') {
          window.location.href = '/student-dashboard';
        } else if (res.data.role === 'mentor') {
          window.location.href = '/mentor-dashboard';
        } else if (res.data.role === 'psychologist') {
          window.location.href = '/psychologist-dashboard';
        }
      } else {
        setFeedback('❌ Login failed: Invalid credentials');
      }
    } catch (error) {
      setFeedback('❌ Login failed: Invalid credentials');
    }
  };

  // Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    // Only allow Strathmore emails
    if (!decoded.email.endsWith('@strathmore.edu')) {
      setFeedback('❌ Only Strathmore accounts are allowed.');
      return;
    }
    try {
      // Send Google token to backend for verification/login
      const res = await axios.post('http://localhost:8000/api/auth/google-login/', {
        token: credentialResponse.credential,
      });
      if (res.data.success) {
        setFeedback(`✅ Welcome, ${res.data.username}`);
        if (res.data.role === 'student') {
          window.location.href = '/student-dashboard';
        } else if (res.data.role === 'mentor') {
          window.location.href = '/mentor-dashboard';
        } else if (res.data.role === 'psychologist') {
          window.location.href = '/psychologist-dashboard';
        }
      } else {
        setFeedback('❌ Google login failed.');
      }
    } catch (error) {
      setFeedback('❌ Google login failed.');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>Username or ID:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username or ID"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button type="submit">Login</button>
        <p>{feedback}</p>
      </form>
      <div style={{ marginTop: '1em' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setFeedback('❌ Google login failed.')}
        />
      </div>
    </div>
  );
};

export default Login;
