import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminSignin from "./pages/AdminSignin";

import VictimHome from "./pages/victim/Home";
import VictimRequests from "./pages/victim/RequestsHistory";
import VictimProfile from "./pages/victim/PersonalInfo";
import VictimFeedback from "./pages/victim/Feedback";

import DonorHome from "./pages/donor/Home";
import InProgress from "./pages/donor/InProgress";
import DonorRequests from "./pages/donor/RequestsHistory";
import DonorProfile from "./pages/donor/PersonalInfo";
import DonorFeedback from "./pages/donor/Feedback";

import ProtectedRoute from "./services/privateRoute";
import PublicRoute from "./services/publicRoute";

import DashboardLayout from "./components/dashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/admin-signin" element={<PublicRoute><AdminSignin /></PublicRoute>} />

        <Route element={<ProtectedRoute role="victim" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/victim/dashboard" element={<VictimHome />} />
            <Route path="/victim/dashboard/requests" element={<VictimRequests />} />
            <Route path="/victim/dashboard/profile" element={<VictimProfile />} />
            <Route path="/victim/dashboard/feedback" element={<VictimFeedback />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="donor" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/donor/dashboard" element={<DonorHome />} />
            <Route path="/donor/dashboard/in-progress" element={<InProgress />} />
            <Route path="/donor/dashboard/requests" element={<DonorRequests />} />
            <Route path="/donor/dashboard/profile" element={<DonorProfile />} />
            <Route path="/donor/dashboard/feedback" element={<DonorFeedback />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
