import Sidebar from "./sidebar";
import "../style/Dashboard.css";

function DashboardLayout({ children, userName, userEmail }) {
  return (
    <div className="dashboard-wrapper">
      <Sidebar userName={userName} userEmail={userEmail} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
