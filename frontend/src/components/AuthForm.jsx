import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/AuthForm.css";

const AuthForm = ({ onSubmit, admin, response }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  });
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const isSignin = path === "/signin" || path === "/admin-signin";
  const isAdmin = path === "/admin-signin";

  const toggleForm = () => {
    if (isSignin && !isAdmin) navigate("/signup");
    else navigate("/signin");
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      setError("Fill Out All The Fields.")
      return false;
    }

    else if (!emailRegex.test(formData.email)) {
      setError("Invalid email address.");
      return false;
    }

    if (!isSignin) {
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return false;
      }

      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError("Phone number must be 10-15 digits.");
        return false;
      }

      if (formData.role !== "donor" && formData.role !== "victim") {
        setError("Please select a role.");
        return false;
      }
    } else {
      if (!formData.password) {
        setError("Password is required.");
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue =
      name !== "email" && name !== "role"
        ? value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        : value;

    setFormData({ ...formData, [name]: newValue });
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await onSubmit(formData);
    if (success) {
      setFormData({ name: "", email: "", password: "", phone: "", role: "" });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {isSignin ? (
          <>
            <h2>{isAdmin ? "Admin Sign In" : "Sign In"}</h2>
            <h4 className="message error" style={{ marginBottom: "10px" }}>
              {error || response}
            </h4>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>
              {isAdmin ? "Admin Login" : "Login"}
            </button>
            {!isAdmin && (
              <p>
                Don’t have an account?{" "}
                <span className="auth-link" onClick={toggleForm}>
                  Sign Up
                </span>
              </p>
            )}
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <p className="message error" style={{ marginBottom: "10px" }}>
              {error || response}
            </p>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="radio-group">
              <label className={`radio-option ${formData.role === "donor" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={formData.role === "donor"}
                  onChange={handleChange}
                />
                <span>Donor</span>
              </label>

              <label className={`radio-option ${formData.role === "victim" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="victim"
                  checked={formData.role === "victim"}
                  onChange={handleChange}
                />
                <span>Victim</span>
              </label>
            </div>
            <button onClick={handleSubmit}>Create Account</button>

            <p>
              Already have an account?{" "}
              <span className="auth-link" onClick={toggleForm}>
                Sign In
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;