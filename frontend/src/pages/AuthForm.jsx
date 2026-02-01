import { useState } from "react";
import "../style/AuthForm.css";

const SignInForm = ({ toggleForm }) => {
  return (
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
  );
};

const SignUpForm = ({ toggleForm }) => {
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
      <button>Create Account</button>
      <p>
        Already have an account?{" "}
        <span className="auth-link" onClick={toggleForm}>
          Sign In
        </span>
      </p>
    </div>
  );
};

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="auth-wrapper">
      {isSignup ? <SignUpForm toggleForm={toggleForm} /> : <SignInForm toggleForm={toggleForm} />}
    </div>
  );
};

export default AuthForm;