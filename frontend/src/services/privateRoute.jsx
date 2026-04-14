import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;