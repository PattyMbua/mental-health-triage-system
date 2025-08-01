// Eventually connect to DB
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Demo user — you can replace with real PostgreSQL check later
  const mockUser = {
    email: 'student@strathmore.edu',
    password: '123456',
    name: 'Student A',
    role: 'student'
  };

  if (email === mockUser.email && password === mockUser.password) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        name: mockUser.name,
        role: mockUser.role,
        email: mockUser.email,
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

module.exports = { loginUser };
