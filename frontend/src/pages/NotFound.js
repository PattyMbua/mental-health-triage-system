// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>404 - Page Not Found 🚫</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

export default NotFound;
