import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import "./Signup.css";

const BACKEND_URL = "http://localhost:8000";

const Signup = () => {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const validatePassword = (password, studentId, email) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isWeak = password.length < minLength || !hasSpecialChar || password.includes(studentId) || password === email;

    let feedbackMessage = "";
    if (password.length < minLength) feedbackMessage += "Password must be at least 8 characters. ";
    if (!hasSpecialChar) feedbackMessage += "Password must include a special character (e.g., !@#$%). ";
    if (password.includes(studentId)) feedbackMessage += "Password cannot contain your Student ID. ";
    if (password === email) feedbackMessage += "Password cannot be your email address. ";
    return { isWeak, feedbackMessage };
  };

  const validateFullName = (fullName) => {
    const nameWords = fullName.trim().split(/\s+/).filter(word => word.length > 0);
    const isInvalid = nameWords.length < 2;
    let feedbackMessage = "";
    if (isInvalid) feedbackMessage = "Full Name must include at least two words (e.g., First and Last Name).";
    return { isInvalid, feedbackMessage };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFeedback("");

    const { isWeak, feedbackMessage: passwordFeedback } = validatePassword(password, studentId, email);
    const { isInvalid: nameInvalid, feedbackMessage: nameFeedback } = validateFullName(fullName);

    if (!studentId || !fullName || !email || !password || !confirmPassword) {
      setFeedback("❌ Please fill in all fields.");
      return;
    }
    if (isWeak) {
      setFeedback(`❌ ${passwordFeedback}`);
      return;
    }
    if (nameInvalid) {
      setFeedback(`❌ ${nameFeedback}`);
      return;
    }
    if (password !== confirmPassword) {
      setFeedback("❌ Passwords do not match. Please confirm your password.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, fullName, email, password }),
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
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
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
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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