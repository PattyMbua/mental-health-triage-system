import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import "./Signup.css";

const BACKEND_URL = "http://localhost:8000";

const Signup = () => {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!studentId || !fullName || !email) {
      setFeedback("❌ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, fullName, email, role: "student" }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback("✅ Sign up successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login?role=student";
        }, 2000);
      } else {
        setFeedback(`❌ Sign up failed: ${data.message || "Try again."}`);
      }
    } catch (error) {
      setFeedback(`❌ Sign up failed: ${error.message || "Network error"}`);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="System Logo" className="signup-logo" />
        <h1>Mental Health Triage System</h1>
        <h2>Student Sign Up</h2>
        <p className="subtext">Create your account to access support</p>
        <form onSubmit={handleSignup}>
          <label htmlFor="studentId" className="sr-only">
            Student ID
          </label>
          <input
            id="studentId"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student ID"
            required
          />
          <label htmlFor="fullName" className="sr-only">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <label htmlFor="email" className="sr-only">
            Strathmore Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Strathmore Email"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already signed up? <a href="/login?role=student">Log In</a>
        </p>
        <p className="privacy-note">Your data is secure and confidential.</p>
      </div>
    </div>
  );
};

export default Signup;