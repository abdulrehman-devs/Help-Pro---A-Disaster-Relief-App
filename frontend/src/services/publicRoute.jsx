import React from "react";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return children;
};

export default PublicRoute;