import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const adminToken = localStorage.getItem("adminToken");

  if (location.pathname === "/admin-signin" && adminToken) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (
    (location.pathname === "/signin" || location.pathname === "/signup") &&
    token &&
    role
  ) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children;
};

export default PublicRoute;
