import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/AuthForm.css";

const AuthForm = ({ onSubmit, admin, response }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", role: "" });
  const [error, setError] = useState("");
 
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const isSignin = path === "/signin" || path === "/admin-signin";
  const isAdmin = path === "/admin-signin";

  const toggleForm = () => {
    if (isSignin && !isAdmin) navigate("/signup"); else navigate("/signin");
  };

  const validateForm = () => {

    if (!isSignin) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        setError("Invalid email address.");
        return false;
      }

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

    }

    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Invalid email address.");
        return false;
      }

      if (!formData.password) {
        setError("Password is required.");
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    else {
      const success = await onSubmit(formData);
      if (success) {
        setFormData({ name: "", email: "", password: "", phone: "", role: "" });
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {isSignin ? (
          <>
            <h2>{isAdmin ? "Admin Sign In" : "Sign In"}</h2>
            <h4 className="message error" style={{"marginBottom": "10px"}}>{error? error : response}</h4>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

            <button onClick={handleSubmit}>{isAdmin ? "Admin Login" : "Login"}</button>
            {!isAdmin && <p>Don’t have an account? <span className="auth-link" onClick={toggleForm}>Sign Up</span></p>}
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <p className="message error" style={{"marginBottom": "10px"}}>{error? error : response}</p>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

            <div className="radio-group" style={{ display: "flex", gap: "20px", justifyContent: "left", marginBottom: "15px" }}>
              <label><input type="radio" name="role" value="donor" checked={formData.role === "donor"} onChange={handleChange} /> Donor</label>
              <label><input type="radio" name="role" value="victim" checked={formData.role === "victim"} onChange={handleChange} /> Victim</label>
            </div>

            <button onClick={handleSubmit}>Create Account</button>

            <p>Already have an account? <span className="auth-link" onClick={toggleForm}>Sign In</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
