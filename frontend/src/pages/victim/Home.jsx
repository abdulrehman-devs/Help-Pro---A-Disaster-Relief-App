import '../../style/Dashboard.css';
import Sidebar from '../../components/sidebar';

const stats = [
  { icon: "bi-box-seam", label: "Total Requests", value: "24", color: "blue" },
  { icon: "bi-check-circle", label: "Fulfilled", value: "18", color: "green" },
  { icon: "bi-clock-history", label: "Pending", value: "4", color: "orange" },
  { icon: "bi-exclamation-triangle", label: "Urgent", value: "2", color: "red" },
];

const activities = [
  { text: "Your food supply request was fulfilled by Donor #1042", time: "2 hours ago", color: "green" },
  { text: "New medical aid request submitted", time: "5 hours ago", color: "blue" },
  { text: "Shelter request is under review", time: "1 day ago", color: "orange" },
  { text: "Water supply request marked as urgent", time: "2 days ago", color: "red" },
  { text: "Clothing request fulfilled by Donor #987", time: "3 days ago", color: "green" },
];

const VictimHome = () => {

  return (
    <div>
      <Sidebar 
        userName="Ali Khan"
        userEmail="ali@gmail.com"
      />
      
      <div className="page-title-bar">
        <div>
          <h1>Dashboard Overview</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i> Home &gt; Overview
          </span>
        </div>
        <span className="breadcrumb-text">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((s, i) => (
          <div className="col-lg-3 col-md-6" key={i}>
            <div className="dash-card stat-card">
              <div className={`stat-icon ${s.color}`}>
                <i className={`bi ${s.icon}`}></i>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="dash-card">
            <h5 style={{ fontWeight: 700, marginBottom: 16 }}>
              <i className="bi bi-geo-alt me-2" style={{ color: "#e17055" }}></i>
              Nearby Relief Centers
            </h5>
            <div className="map-container">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1353%2C51.4965%2C-0.0763%2C51.5225&layer=mapnik"
                title="Relief Centers Map"
                loading="lazy"
              ></iframe>
              <div className="map-overlay">
                <i className="bi bi-pin-map-fill"></i>
                5 relief centers nearby
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="dash-card" style={{ height: "100%" }}>
            <h5 style={{ fontWeight: 700, marginBottom: 16 }}>
              <i className="bi bi-activity me-2" style={{ color: "#6c5ce7" }}></i>
              Recent Activity
            </h5>
            {activities.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className={`activity-dot ${a.color}`}></div>
                <div className="activity-text">
                  {a.text}
                  <span className="time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VictimHome;
