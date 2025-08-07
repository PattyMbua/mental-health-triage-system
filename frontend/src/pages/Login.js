import React, { useState } from 'react';
import axios from 'axios';
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
    </div>
  );
};

export default Login;
