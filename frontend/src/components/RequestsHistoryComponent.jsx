import { useState, useEffect } from "react";
import '../style/Dashboard.css';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import { useOutletContext } from "react-router-dom";

export default function VictimRequestsHistory() {

  const [role, setRole] = useState("");
  const [requests, setRequests] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoverData, setHoverData] = useState(null);

  const { userData } = useOutletContext();

  const fetchRequestsHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      const url =
        storedRole === "donor"
          ? `http://localhost:5000/api/requests/${storedRole}?type=Accepted,Fulfilled`
          : `http://localhost:5000/api/requests/${storedRole}`;

      const res = await axios.get(
        url,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRequests(res.data.activeRequests || res.data || []);
      console.log(res.data)

    }
    catch (e) {
      console.log("Error:", e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    fetchRequestsHistory();
  }, []);

  const checkRole = () => {
    const role = localStorage.getItem("role");

    if (role === "victim") {
      setRole("donor")
    }
    else {
      setRole("victim")
    }
  }

  useEffect(() => {
    checkRole();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      await axios.delete(`http://localhost:5000/api/requests/${role}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(requests.filter(req => req._id !== id));
    }
    catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  const handleHover = (req) => {

    setHoverData({
      phone: req.donor?.phone || req.victim?.phone,
      city: req.donor?.city || req.victim?.city || 'N/A'
    });

    setHoveredId(req._id);
  };

  const handleLeave = () => {
    setHoveredId(null);
    setHoverData(null);
  };


  return (
    <div>
      <Sidebar userData={userData} />

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
              <th className="hide-mobile">Serial No</th>
              <th>Type</th>
              <th className="hide-mobile">Date</th>
              <th className="hide-mobile">Priority</th>
              <th>Status</th>
              <th>{role}</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={i}>
                <td className="hide-mobile" style={{ fontWeight: "700" }}>{i + 1}</td>
                <td>{req.deliveryType}</td>
                <td className="hide-mobile">{new Date(req.createdAt).toLocaleDateString()}</td>
                <td className="hide-mobile">{"High"}</td>
                <td>{req.status}</td>
                <td
                  onMouseOver={() => handleHover(req)}
                  onMouseLeave={handleLeave}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  {req.donor?.name || req.victim?.name || "Not assigned"}

                  {hoveredId === req._id && hoverData && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "25%",
                        transform: "translateY(-70%)",
                        background: "#ffffff",
                        color: "#2d3436",
                        padding: "14px",
                        borderRadius: "10px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        width: "200px",
                        zIndex: 999,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ marginBottom: "8px" }}><strong>📞:  </strong>{hoverData.phone}</div>
                      <div><strong>📍:  </strong> {hoverData.city}</div>
                    </div>
                  )}
                </td>
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
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e74c3c"} onClick={() => handleDelete(req._id)}>
                  {
                    req.role === "Donor" && req.status === "Accepted" ?
                      "Cancel Request" :
                      "Delete"
                  }
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
