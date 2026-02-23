import { useEffect, useRef, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/sidebar";
import { useOutletContext } from "react-router-dom";

const activities = [
  { text: "Fulfilled food supply request REQ-1001 for Victim #245", time: "2 hour ago", color: "green" },
  { text: "Accepted medical aid request REQ-1015", time: "4 hours ago", color: "purple" },
  { text: "Donation of clothing shipped to Shelter #12", time: "1 day ago", color: "orange" },
  { text: "Received 5-star rating from Victim #189", time: "1 week ago", color: "green" },
  { text: "New matching request available in your area", time: "7 days ago", color: "blue" },
];

export default function VictimHome() {
  const {userData} = useOutletContext();

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([]);

  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersLayer = useRef(null);

  const getRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/requests/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data || []);
      console.log(res.data);
    } catch (e) {
      console.error("Error fetching requests:", e.response?.data || e.message);
    }
  };

  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/requests/donor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats([
        { icon: "bi-gift", label: "Total Requests", value: res.data.totalCount || 0, color: "green" },
        { icon: "bi-people", label: "Completed Requests", value: res.data.fulfilledCount || 0, color: "blue" },
        { icon: "bi-hourglass-split", label: "In Progress", value: res.data.pendingCount || 0, color: "orange" },
      ]);
      console.log(res.data)
    } catch (e) {
      console.error("Error fetching requests:", e.response?.data || e.message);
    }
  }

  useEffect(() => {
    getRequests();
    getStats();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !L) return;

    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([30.3753, 69.3451], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(leafletMap.current);

      markersLayer.current = L.layerGroup().addTo(leafletMap.current);
    }

    markersLayer.current.clearLayers();

    if (requests.length === 0) return;

    const bounds = [];

    requests.forEach((req) => {
      const coords = req?.location?.coordinates;
      if (!coords || coords.length < 2) return;

      const lng = coords[0];
      const lat = coords[1];

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: "",
          html: `
            <div style="
              background: linear-gradient(135deg,#e17055,#d63031);
              width: 34px;
              height: 34px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid #fff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
              display:flex;
              align-items:center;
              justify-content:center;
            ">
              <span style="transform:rotate(45deg);font-size:14px;">📍</span>
            </div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 34],
          popupAnchor: [0, -36],
        }),
      });

      marker.bindPopup(`
        <div style="font-family:'Segoe UI',sans-serif;min-width:180px;">
          <div style="font-weight:700;font-size:0.95rem;margin-bottom:8px;color:#d63031;">
            <i class='bi bi-send-plus'></i> ${req.victim?.name || "Name"}
          </div>
    
          <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px;color:#d63031;">
            <i class='bi bi-send-plus'></i> ${req.deliveryType || "Request"}
          </div>
          <div style="font-size:0.82rem;color:#2d3436;">${req.description || ""}</div>
          <div style="font-size:0.75rem;color:#636e72;margin-top:6px;">
            📍 ${lat.toFixed(4)}, ${lng.toFixed(4)}
          </div>
        </div>
      `);

      markersLayer.current.addLayer(marker);
      bounds.push([lat, lng]);
    });

    if (bounds.length > 0) {
      leafletMap.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [requests]);


  return (
    <div>
      <Sidebar userData={userData}/>
      <div className="page-title-bar">
        <div>
          <h1>Dashboard Overview | Donor</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i> Home &gt; Overview
          </span>
        </div>
        <span className="breadcrumb-text">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="row g-10 mb-4">
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
              Active Requests From Victims
            </h5>
            <div className="map-container" ref={mapRef} style={{ height: 420, borderRadius: 14, zIndex: 0 }}></div>
            {requests.length === 0 && (
              <div className="map-overlay">
                <i className="bi bi-pin-map-fill"></i>
                Accept Only Pending Requests.
              </div>
            )}
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
