import React from "react";
import { Navigate } from "react-router-dom";

const PrivateAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  
  if (!token) {
    return <Navigate to="/admin-signin" replace />;
  }

  return children;
};

export default PrivateAdmin;