import { useState } from "react";
import '../../style/Dashboard.css';
import Sidebar from '../../components/sidebar';

const activeRequests = [
  { id: "REQ-1001", type: "Food Supply", date: "2024-12-01", priority: "High", status: "Active", donor: "Pending" },
  { id: "REQ-1005", type: "Medical Aid", date: "2024-12-03", priority: "High", status: "Active", donor: "Pending" },
  { id: "REQ-1008", type: "Shelter", date: "2024-12-05", priority: "Medium", status: "Active", donor: "Donor #1042" },
  { id: "REQ-1012", type: "Water Supply", date: "2024-12-07", priority: "High", status: "Active", donor: "Pending" },
];

const completedRequests = [
  { id: "REQ-0901", type: "Clothing", date: "2024-11-15", priority: "Low", status: "Completed", donor: "Donor #987" },
  { id: "REQ-0890", type: "Food Supply", date: "2024-11-10", priority: "Medium", status: "Completed", donor: "Donor #1042" },
  { id: "REQ-0876", type: "Medical Aid", date: "2024-11-05", priority: "High", status: "Completed", donor: "Donor #765" },
  { id: "REQ-0860", type: "Water Supply", date: "2024-10-28", priority: "Medium", status: "Completed", donor: "Donor #543" },
  { id: "REQ-0845", type: "Shelter", date: "2024-10-20", priority: "Low", status: "Completed", donor: "Donor #321" },
];

const disputedRequests = [
  { id: "REQ-0950", type: "Food Supply", date: "2024-11-20", priority: "High", status: "Disputed", donor: "Donor #412", reason: "Quality issue" },
  { id: "REQ-0932", type: "Medical Aid", date: "2024-11-18", priority: "Medium", status: "Disputed", donor: "Donor #678", reason: "Incomplete delivery" },
];

export default function VictimRequestsHistory() {
  const [tab, setTab] = useState("active");

  const getData = () => {
    if (tab === "active") return activeRequests;
    if (tab === "completed") return completedRequests;
    return disputedRequests;
  };

  return (
    <div>
      <Sidebar
        role="donor"
        userName="John Doe"
        userEmail="john@example.com"
      />
      
      <div className="page-title-bar">
        <div>
          <h1>Requests History</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i> Home &gt; Requests
          </span>
        </div>
      </div>

      <div className="dash-card">
        <div className="custom-tabs">
          <button className={tab === "active" ? "active" : ""} onClick={() => setTab("active")}>
            <i className="bi bi-clock me-1"></i>
            Active
            <span className="badge-count active-badge">{activeRequests.length}</span>
          </button>
          <button className={tab === "completed" ? "active" : ""} onClick={() => setTab("completed")}>
            <i className="bi bi-check-circle me-1"></i>
            Completed
            <span className="badge-count completed-badge">{completedRequests.length}</span>
          </button>
          <button className={tab === "disputed" ? "active" : ""} onClick={() => setTab("disputed")}>
            <i className="bi bi-exclamation-circle me-1"></i>
            Disputed
            <span className="badge-count disputed-badge">{disputedRequests.length}</span>
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Type</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Donor</th>
                {tab === "disputed" && <th>Reason</th>}
              </tr>
            </thead>
            <tbody>
              {getData().map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`priority-dot ${r.priority.toLowerCase()}`}>{r.priority}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${r.status.toLowerCase()}`}>{r.status}</span>
                  </td>
                  <td>{r.donor}</td>
                  {tab === "disputed" && <td>{r.reason}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
