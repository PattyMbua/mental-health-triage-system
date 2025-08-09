import React, { useState } from 'react';
import { loginUser } from '../mockBackend';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Use the mock login function
    const res = loginUser(username, password);

    if (res.success) {
      localStorage.setItem('userRole', res.user.role);
      setFeedback(`✅ Welcome, ${res.user.id}`);
      redirectToDashboard(res.user.role);
    } else {
      setFeedback('❌ Login failed: Invalid credentials');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    if (!decoded.email.endsWith('@strathmore.edu')) {
      setFeedback('❌ Only Strathmore accounts are allowed.');
      return;
    }

    // Mock login success based on email domain
    const mockGoogleUser = {
      id: decoded.email,
      role: 'student' // or assign based on email if needed
    };

    localStorage.setItem('userRole', mockGoogleUser.role);
    setFeedback(`✅ Welcome, ${mockGoogleUser.id}`);
    redirectToDashboard(mockGoogleUser.role);
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
