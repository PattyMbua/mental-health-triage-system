import React from 'react';
import './Login.css';
import bgImage from '../assets/carlos-grury-santos-HVNcT5N_2Tc-unsplash.jpg'; // adjust to your image name

const Login = () => {
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form>
        <h2>Login</h2>
        <label>Email or Student ID:</label>
        <input type="text" placeholder="Enter ID or Email" />

        <label>Password:</label>
        <input type="password" placeholder="Enter password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
