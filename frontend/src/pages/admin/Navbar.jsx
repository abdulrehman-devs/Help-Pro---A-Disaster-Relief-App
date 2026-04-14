import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../../style/AdminNavbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-signin");
  };

  return (
    <nav className="navbar-">
      <div className="navbar-container">
        
        <div className="logo">
          Help Pro
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "active" : "" }>Home</NavLink>
          </li>

          <li>
            <NavLink to="/admin-dashboard/users" className={({ isActive }) => isActive ? "active" : "" }>Users</NavLink>
          </li>

          <li>
            <NavLink to="/admin-dashboard/users/requests" className={({ isActive }) => isActive ? "active" : "" }>Requests</NavLink>
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>

      </div>
    </nav>
  );
};

export default Navbar;