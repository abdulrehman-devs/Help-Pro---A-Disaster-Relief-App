import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminSignin from "./pages/AdminSignin";
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from "./services/privateRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signin" element={<AdminSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
