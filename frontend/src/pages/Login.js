import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logo from "../assets/logo.jpg";
import "./Login.css";

const BACKEND_URL = "http://localhost:8000"; // ✅ Correct backend port

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("authToken", data.token);

        setFeedback(`✅ Welcome, ${data.user.name || data.user.id}`);
        redirectToDashboard(data.user.role);
      } else {
        setFeedback(`❌ Login failed: ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      setFeedback(`❌ Login failed: ${error.message || "Network error"}`);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/google-login/`,
        { token: credentialResponse.credential }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", response.data.user.role);

        setFeedback("✅ Google login successful!");
        redirectToDashboard(response.data.user.role);
      } else {
        setFeedback(
          `❌ Google login failed: ${response.data.error || "Unknown error."}`
        );
      }
    } catch (error) {
      setFeedback(
        `❌ Google login failed: ${
          error.response?.data?.error || error.message || "Network error."
        }`
      );
    }
  };

  const redirectToDashboard = (role) => {
    switch (role) {
      case "student":
        window.location.href = "/DashboardStudent";
        break;
      case "mentor":
        window.location.href = "/DashboardMentor";
        break;
      case "psychologist":
        window.location.href = "/DashboardPsychologist";
        break;
      default:
        setFeedback("❌ Unknown role.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <img src={logo} alt="System Logo" className="login-logo" />

        {/* Student login (Google) */}
        <div className="google-login-wrapper" style={{ marginBottom: "2rem" }}>
          <h2>Student Login</h2>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setFeedback("❌ Google login failed.")}
            useOneTap
            width="100%"
            shape="pill"
            theme="outline"
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Login with your Strathmore Google account
          </p>
        </div>

        <hr style={{ margin: "1.5rem 0" }} />

        {/* Staff login (manual) */}
        <form onSubmit={handleLogin}>
          <h2>Staff Login</h2>
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
      </div>
    </div>
  );
};

export default Login;
