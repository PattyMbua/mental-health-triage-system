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
        password,
      });

      if (res.data.success) {
        localStorage.setItem('userRole', res.data.role);
        setFeedback(`✅ Welcome, ${res.data.username}`);
        redirectToDashboard(res.data.role);
      } else {
        setFeedback('❌ Login failed: Invalid credentials');
      }
    } catch (error) {
      setFeedback('❌ Login failed: Invalid credentials');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    if (!decoded.email.endsWith('@strathmore.edu')) {
      setFeedback('❌ Only Strathmore accounts are allowed.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/google-login/', {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem('userRole', res.data.role);
        setFeedback(`✅ Welcome, ${res.data.username}`);
        redirectToDashboard(res.data.role);
      } else {
        setFeedback('❌ Google login failed.');
      }
    } catch (error) {
      setFeedback('❌ Google login failed.');
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
        {feedback && <p style={{ textAlign: 'center', marginTop: '10px' }}>{feedback}</p>}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setFeedback('❌ Google login failed.')}
            useOneTap
            width="100%"
            shape="pill"
            theme="outline"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
