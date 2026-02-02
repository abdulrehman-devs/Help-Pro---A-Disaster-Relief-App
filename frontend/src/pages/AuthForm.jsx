import { useState } from "react";
import "../style/AuthForm.css";

const SignInForm = ({ toggleForm }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign In</h2>

        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don’t have an account?{" "}
          <span className="auth-link" onClick={toggleForm}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

const SignUpForm = ({ toggleForm }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign Up</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <input type="tel" placeholder="Phone Number" />

        <div className="radio-group">
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
      </div>
    </div>
  );
};

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);

  return isSignup ? (
    <SignUpForm toggleForm={() => setIsSignup(false)} />
  ) : (
    <SignInForm toggleForm={() => setIsSignup(true)} />
  );
};

export default AuthForm;
