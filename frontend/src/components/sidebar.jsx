import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Sidebar.css";

function Sidebar({ userName = "User Name", userEmail = "user@example.com" }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isVictim = role === "victim";
  const dashTitle = isVictim ? "Victim Dashboard" : "Donor Dashboard";
  const initials = userName
    ? userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="mobile-navbar">
        <div className="mobile-navbar-left">
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <i className="bi bi-x-lg" style={{ color: "#fff", fontSize: "1.1rem" }}></i>
            ) : (
              <span className="hamburger-lines">
                <span className="hline"></span>
                <span className="hline"></span>
                <span className="hline"></span>
              </span>
            )}
          </button>
          <span className="mobile-nav-title">{dashTitle}</span>
        </div>
        <span className={`role-badge ${role}`}>
          {isVictim ? "Victim" : "Donor"}
        </span>
      </header>

      {menuOpen && (
        <div className="sidebar-backdrop" onClick={closeMenu} />
      )}

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-header">
          <span className={`role-badge ${role}`}>
            {isVictim ? "Victim" : "Donor"}
          </span>
          <h2 className="sidebar-title">{dashTitle}</h2>
          <p className="sidebar-subtitle">Relief Management System</p>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink
                to={isVictim ? "/victim/dashboard" : "/donor/dashboard"}
                end
                onClick={closeMenu}
              >
                <i className="bi bi-house-door"></i>
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={isVictim ? "/victim/dashboard/requests" : "/donor/dashboard/requests"}
                onClick={closeMenu}
              >
                <i className="bi bi-clock-history"></i>
                <span>Requests History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={isVictim ? "/victim/dashboard/profile" : "/donor/dashboard/profile"}
                onClick={closeMenu}
              >
                <i className="bi bi-person-circle"></i>
                <span>Personal Info</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={isVictim ? "/victim/dashboard/feedback" : "/donor/dashboard/feedback"}
                onClick={closeMenu}
              >
                <i className="bi bi-chat-square-text"></i>
                <span>Feedback / Report</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Footer */}
        <div className="sidebar-footer">
          <div
            className="user-avatar"
            onClick={() => {
              navigate(`/${role}/dashboard/profile`);
              closeMenu();
            }}
            title="Go to profile"
          >
            {initials}
          </div>
          <p className="user-name">{userName}</p>
          <span className="user-email">{userEmail}</span>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Log Out</span>
          </button>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
