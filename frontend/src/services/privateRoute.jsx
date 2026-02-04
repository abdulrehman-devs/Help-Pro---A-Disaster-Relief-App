import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (role === "user" && !userToken) {
    return <Navigate to="/signin" replace />;
  }

  if (role === "admin" && !adminToken) {
    return <Navigate to="/admin-signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
