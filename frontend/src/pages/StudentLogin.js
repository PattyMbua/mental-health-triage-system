import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";


const BACKEND_URL = "http://localhost:8000";
const StudentLogin = () => {
  const [feedback, setFeedback] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/google-login/`,
        { token: credentialResponse.credential }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", "student");
        setFeedback("✅ Google login successful!");
        window.location.href = "/DashboardStudent";
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

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!studentId || !password) {
      setFeedback("❌ Please enter both Student ID and Password.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/login/`, {
        studentId,
        password,
        role: "student",
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", "student");
        setFeedback("✅ Login successful!");
        window.location.href = "/DashboardStudent";
      } else {
        setFeedback(`❌ Login failed: ${response.data.message || "Try again."}`);
      }
    } catch (error) {
      setFeedback(
        `❌ Login failed: ${error.response?.data?.message || error.message || "Network error."}`
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Student Login</h2>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setFeedback("❌ Google login failed.")}
          useOneTap
          width="100%"
          shape="pill"
          theme="outline"
        />
        <p className="login__subtext" style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Login with your Strathmore Google account
        </p>

        <div className="login__separator">OR</div>

        <form className="login__form" onSubmit={handleManualLogin}>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student ID"
            className="login__input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login__input"
            required
          />
          <button type="submit" className="login__submit-btn">
            Log In
          </button>
        </form>

        {feedback && <p className="login__feedback">{feedback}</p>}
        <p className="login__privacy-note">Your data is secure and confidential.</p>
      </div>
    </div>
  );
};

export default StudentLogin;