import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LandingPage from "./pages/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import UserDashboard from "./pages/UserDashboard";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminSignin from './pages/AdminSignin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< LandingPage />} />
          <Route path="/user-dash" element={< UserDashboard />} ></Route>
          <Route path="signin" element={<Signin/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="admin-signin" element={<AdminSignin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
