import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";

const BACKEND_URL = "http://localhost:8000";

const StudentLogin = () => {
  const [feedback, setFeedback] = useState("");

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
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Login with your Strathmore Google account
        </p>
        {feedback && <p className="feedback">{feedback}</p>}
        <p className="privacy-note">Your data is secure and confidential.</p>
      </div>
    </div>
  );
};

export default StudentLogin;