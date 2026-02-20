import { useState } from "react";
import '../../style/Dashboard.css';
import Sidebar from '../../components/sidebar';

const activeRequests = [
  { id: "DON-2001", type: "Food Supply", date: "2024-12-01", priority: "High", status: "Active", victim: "Victim #245", amount: "$150" },
  { id: "DON-2005", type: "Medical Aid", date: "2024-12-03", priority: "High", status: "Active", victim: "Victim #312", amount: "$300" },
  { id: "DON-2008", type: "Clothing", date: "2024-12-04", priority: "Medium", status: "Active", victim: "Victim #178", amount: "$80" },
  { id: "DON-2010", type: "Water Supply", date: "2024-12-06", priority: "High", status: "Active", victim: "Victim #456", amount: "$120" },
  { id: "DON-2014", type: "Shelter Materials", date: "2024-12-08", priority: "Medium", status: "Active", victim: "Victim #523", amount: "$500" },
];

const completedRequests = [
  { id: "DON-1901", type: "Food Supply", date: "2024-11-20", priority: "Low", status: "Completed", victim: "Victim #189", amount: "$200" },
  { id: "DON-1895", type: "Medical Aid", date: "2024-11-15", priority: "High", status: "Completed", victim: "Victim #267", amount: "$450" },
  { id: "DON-1880", type: "Clothing", date: "2024-11-10", priority: "Medium", status: "Completed", victim: "Victim #134", amount: "$100" },
  { id: "DON-1865", type: "Water Supply", date: "2024-11-05", priority: "Low", status: "Completed", victim: "Victim #398", amount: "$75" },
];

const disputedRequests = [
  { id: "DON-1950", type: "Food Supply", date: "2024-11-22", priority: "High", status: "Disputed", victim: "Victim #290", amount: "$180", reason: "Delivery not received" },
  { id: "DON-1940", type: "Shelter Materials", date: "2024-11-19", priority: "Medium", status: "Disputed", victim: "Victim #345", amount: "$600", reason: "Wrong items delivered" },
  { id: "DON-1935", type: "Medical Aid", date: "2024-11-17", priority: "High", status: "Disputed", victim: "Victim #412", amount: "$250", reason: "Expired supplies" },
];

export default function DonorRequestsHistory() {
  const [tab, setTab] = useState("active");

  const getData = () => {
    if (tab === "active") return activeRequests;
    if (tab === "completed") return completedRequests;
    return disputedRequests;
  };

  return (
    <div>
      <Sidebar
        role="donor"                  // "donor" or "victim"
        userName="John Doe"
        userEmail="john@example.com"
      />     
      
      <div className="page-title-bar">
        <div>
          <h1>Donation History</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i> Home &gt; History
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
                <th>Donation ID</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Recipient</th>
                {tab === "disputed" && <th>Reason</th>}
              </tr>
            </thead>
            <tbody>
              {getData().map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.date}</td>
                  <td style={{ fontWeight: 600, color: "#28a745" }}>{r.amount}</td>
                  <td>
                    <span className={`priority-dot ${r.priority.toLowerCase()}`}>{r.priority}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${r.status.toLowerCase()}`}>{r.status}</span>
                  </td>
                  <td>{r.victim}</td>
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
