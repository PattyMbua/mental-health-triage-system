// src/pages/Logout.js
import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.clear(); // Or just remove your specific auth keys if preferred
    window.location.href = '/login';
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
