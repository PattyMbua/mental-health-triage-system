import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback('');

    try {
      const response = await fetch('https://your-backend-url/api/login', {  // Replace with your backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('authToken', data.token);  // Save JWT or token if any

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
      const decoded = jwtDecode(credentialResponse.credential);

      if (!decoded.email.endsWith('@strathmore.edu')) {
        setFeedback('❌ Only Strathmore accounts are allowed.');
        return;
      }

      // Here you might want to verify the token with your backend for security
      // For now, mock login success:
      const mockGoogleUser = {
        id: decoded.email,
        role: 'student' // Adjust logic if needed based on email/domain
      };

      localStorage.setItem('userRole', mockGoogleUser.role);
      setFeedback(`✅ Welcome, ${mockGoogleUser.id}`);
      redirectToDashboard(mockGoogleUser.role);

    } catch (error) {
      setFeedback('❌ Invalid Google token.');
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

        <div className="google-login-wrapper">
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
