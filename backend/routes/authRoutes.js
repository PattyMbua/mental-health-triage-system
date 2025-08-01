const express = require('express');
const router = express.Router();

// Dummy login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Placeholder logic
  if (email === 'test@strathmore.edu' && password === 'password123') {
    return res.status(200).json({ message: 'Login successful' });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
