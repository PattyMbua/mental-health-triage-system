// src/mockBackend.js

const mockUsers = [
  {
    id: "152569",
    password: "1234Patty",
    role: "student"
  },
  {
    id: 'mentor001',
    password: 'mentorpass',
    role: 'mentor'
  },
  {
    id: 'psych001',
    password: 'psychpass',
    role: 'psychologist'
  }
];

export function loginUser(id, password) {
  const user = mockUsers.find(u => u.id === id && u.password === password);
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        role: user.role
      }
    };
  } else {
    return {
      success: false,
      message: "Invalid ID or password"
    };
  }
}
