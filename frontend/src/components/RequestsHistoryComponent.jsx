import { useState, useEffect } from "react";
import '../style/Dashboard.css';
import axios from 'axios';
import Sidebar from '../components/sidebar';

export default function VictimRequestsHistory() {
  const [role, setRole] = useState("");
  const [requests, setRequests] = useState([]);

  const fetchRequestsHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/requests/victim", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(res.data.activeRequests);
      console.log(res.data.activeRequests);
    } catch (e) {
      console.log("Error:", e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    fetchRequestsHistory();
  }, []);

  const checkRole = () => {
    const role = localStorage.getItem("role");

    if (role === "victim") {
      setRole("Donor")
    }
    else {
      setRole("Victim")
    }
  }

  useEffect(() => {
    checkRole();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/requests/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Request deleted successfully!");

      setRequests(requests.filter(req => req._id !== id));
    }
    catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
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

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned {role}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={i}>
                <td>{req._id}</td>
                <td>{req.deliveryType}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{"High"}</td>
                <td>{req.status}</td>
                <td>{req.donor || "Not assigned"}</td>
                <td><button style={{
                  color: "#fff",                 
                  backgroundColor: "#e74c3c",   
                  border: "none",               
                  padding: "6px 12px",           
                  borderRadius: "4px",           
                  cursor: "pointer",            
                  fontWeight: "bold",           
                  transition: "background-color 0.2s ease", 
                }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#c0392b"} 
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e74c3c"} onClick={() => handleDelete(req._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
