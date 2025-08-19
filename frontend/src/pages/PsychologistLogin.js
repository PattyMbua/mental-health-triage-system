import React, { useState } from "react";
import "./Login.css";

const BACKEND_URL = "http://localhost:8000";

const PsychologistLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/psychologist-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok && data.user && data.user.role === "psychologist") {
        localStorage.setItem("userRole", "psychologist");
        localStorage.setItem("authToken", data.token || "");
        setFeedback(`✅ Welcome, ${data.user.name || data.user.id}`);
        window.location.href = "/DashboardPsychologist";
      } else {
        setFeedback(`❌ Login failed: ${data.error || data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      setFeedback(`❌ Login failed: ${error.message || "Network error"}`);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Psychologist Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or ID"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
        <p className="privacy-note">Your data is secure and confidential.</p>
      </div>
    </div>
  );
};

export default PsychologistLogin;