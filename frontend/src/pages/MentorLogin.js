import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const BACKEND_URL = "http://localhost:8000";

const MentorLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleMentorLogin = async (e) => {
    e.preventDefault();
    setFeedback("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/mentor-login/`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token || "dummy-token");
        localStorage.setItem("userRole", "mentor");

        setFeedback(`✅ Welcome, ${response.data.user.name || username}`);
        window.location.href = "/DashboardMentor";
      } else {
        setFeedback(`❌ ${response.data.error}`);
      }
    } catch (error) {
      setFeedback("❌ Login failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Mentor Login</h2>
        <form onSubmit={handleMentorLogin}>
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
        <p className="privacy-note">Your data is secure and confidential.</p>
      </div>
    </div>
  );
};

export default MentorLogin;