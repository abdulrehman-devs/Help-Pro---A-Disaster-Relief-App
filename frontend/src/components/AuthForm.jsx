import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/AuthForm.css";

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  const isSignin = path === "/signin" || path === "/admin-signin";
  const isAdmin = path === "/admin-signin";

  const toggleForm = () => {
    if (isSignin && !isAdmin) {
      navigate("/signup");
    }
    else {
      navigate("/signin");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {isSignin ? (
          <>
            <h2>{isAdmin ? "Admin Sign In" : "Sign In"}</h2>

            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />

            <button>{isAdmin ? "Admin Login" : "Login"}</button>

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

            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <input type="tel" placeholder="Phone Number" />

            <div
              className="radio-group"
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              <label>
                <input type="radio" name="role" value="donor" /> Donor
              </label>
              <label>
                <input type="radio" name="role" value="victim" /> Victim
              </label>
            </div>

            <button>Create Account</button>

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
