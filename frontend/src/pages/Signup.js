import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import "./Signup.css";

const BACKEND_URL = "http://localhost:8000";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const validatePassword = (password, username, email) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isWeak =
      password.length < minLength ||
      !hasSpecialChar ||
      password.includes(username) ||
      password === email;

    let feedbackMessage = "";
    if (password.length < minLength)
      feedbackMessage += "Password must be at least 8 characters. ";
    if (!hasSpecialChar)
      feedbackMessage +=
        "Password must include a special character (e.g., !@#$%). ";
    if (password.includes(username))
      feedbackMessage += "Password cannot contain your username. ";
    if (password === email)
      feedbackMessage += "Password cannot be your email address. ";
    return { isWeak, feedbackMessage };
  };

  const validateUsername = (username) => {
    const isValid = typeof username === "string" && username.trim().length > 0;
    let feedbackMessage = "";
    if (!isValid) feedbackMessage = "Username cannot be empty.";
    return { isValid, feedbackMessage };
  };

  const validateEmail = (email) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@strathmore\.edu$/.test(email);
    let feedbackMessage = "";
    if (!isValid)
      feedbackMessage = "Email must be a valid Strathmore email address.";
    return { isValid, feedbackMessage };
  };

  const validateFirstName = (first_name) => {
    const isValid = first_name.trim().length > 0;
    let feedbackMessage = "";
    if (!isValid) feedbackMessage = "First Name cannot be empty.";
    return { isValid, feedbackMessage };
  };

  const validateLastName = (last_name) => {
    const isValid = last_name.trim().length > 0;
    let feedbackMessage = "";
    if (!isValid) feedbackMessage = "Last Name cannot be empty.";
    return { isValid, feedbackMessage };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (
      !username.trim() ||
      !first_name.trim() ||
      !last_name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setFeedback("❌ Please fill in all fields.");
      return;
    }
    const { isValid: usernameValid, feedbackMessage: usernameFeedback } = validateUsername(username);
    const { isValid: firstNameValid, feedbackMessage: firstNameFeedback } = validateFirstName(first_name);
    const { isValid: lastNameValid, feedbackMessage: lastNameFeedback } = validateLastName(last_name);
    const { isValid: emailValid, feedbackMessage: emailFeedback } = validateEmail(email);
    const { isWeak, feedbackMessage: passwordFeedback } = validatePassword(password, username, email);

    if (!usernameValid) {
      setFeedback(`❌ ${usernameFeedback}`);
      return;
    }
    if (!firstNameValid) {
      setFeedback(`❌ ${firstNameFeedback}`);
      return;
    }
    if (!lastNameValid) {
      setFeedback(`❌ ${lastNameFeedback}`);
      return;
    }
    if (!emailValid) {
      setFeedback(`❌ ${emailFeedback}`);
      return;
    }
    if (isWeak) {
      setFeedback(`❌ ${passwordFeedback}`);
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
        body: JSON.stringify({
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback("✅ Submission successful!");
        setTimeout(() => {
          window.location.href = "/login?role=student";
        }, 2000);
      } else {
        setFeedback(`❌ ${data.message || "Submission not successful."}`);
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
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username (ID or Name)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="first_name" className="sr-only">First Name</label>
          <input
            id="first_name"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <label htmlFor="last_name" className="sr-only">Last Name</label>
          <input
            id="last_name"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <label htmlFor="email" className="sr-only">Strathmore Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Strathmore Email"
            required
          />
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
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
        {feedback && (
          <p className="feedback" style={{ color: "red", marginTop: "1rem" }}>
            {feedback}
          </p>
        )}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already signed up? <a href="/login?role=student">Log In</a>
        </p>
        <p className="privacy-note">Your data is secure and confidential.</p>
      </div>
    </div>
  );
};

export default Signup;