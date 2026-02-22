import '../../style/Dashboard.css';
import Sidebar from '../../components/sidebar';

const stats = [
  { icon: "bi-gift", label: "Donations Made", value: "56", color: "green" },
  { icon: "bi-people", label: "People Helped", value: "142", color: "blue" },
  { icon: "bi-hourglass-split", label: "In Progress", value: "7", color: "orange" },
  { icon: "bi-star", label: "Rating", value: "4.8", color: "red" },
];

const activities = [
  { text: "Fulfilled food supply request REQ-1001 for Victim #245", time: "1 hour ago", color: "green" },
  { text: "Accepted medical aid request REQ-1015", time: "4 hours ago", color: "blue" },
  { text: "Donation of clothing shipped to Shelter #12", time: "1 day ago", color: "orange" },
  { text: "Received 5-star rating from Victim #189", time: "2 days ago", color: "green" },
  { text: "New matching request available in your area", time: "3 days ago", color: "blue" },
];

export default function DonorHome() {
  return (
    <div>
      <Sidebar
        role="donor"                 
        userName="John Doe"
        userEmail="john@example.com"
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
              <i className="bi bi-geo-alt me-2" style={{ color: "#00b894" }}></i>
              Donation Coverage Area
            </h5>
            <div className="map-container">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.68%2C-73.90%2C40.78&layer=mapnik"
                title="Donation Coverage Map"
                loading="lazy"
              ></iframe>
              <div className="map-overlay">
                <i className="bi bi-pin-map-fill"></i>
                12 active requests in your area
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
 