// src/mockBackend.js

const mockUsers = [
  { email: "student1@example.com", password: "1234", role: "student", name: "Alice Student" },
  { email: "mentor1@example.com", password: "1234", role: "mentor", name: "Bob Mentor" },
  { email: "psych1@example.com", password: "1234", role: "psychologist", name: "Dr. Carol Psych" },
];

export const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        resolve({
          success: true,
          token: "mock-token-123",
          user,
        });
      } else {
        reject({ success: false, message: "Invalid credentials" });
      }
    }, 500);
  });
};
