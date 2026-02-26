import { useEffect, useRef, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/sidebar";
import { useOutletContext } from "react-router-dom";

const initialForm = {
  deliveryType: "",
  description: "",
  location: null,
  locationError: "",
  locationLoading: false,
};

const activities = [
  { text: "Fulfilled food supply request REQ-1001 for Victim #245", time: "1 hour ago", color: "green" },
  { text: "Accepted medical aid request REQ-1015", time: "4 hours ago", color: "blue" },
  { text: "Donation of clothing shipped to Shelter #12", time: "1 day ago", color: "orange" },
  { text: "Received 5-star rating from Victim #189", time: "2 days ago", color: "green" },
  { text: "New matching request available in your area", time: "3 days ago", color: "blue" },
];

export default function VictimHome() {
  const {userData} = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([]);
  const [message, setMessage] = useState("");

  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersLayer = useRef(null);

  const openModal = () => {
    setForm(initialForm);
    setSubmitted(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(initialForm);
    setSubmitted(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setForm({ ...form, locationError: "Geolocation not supported by your browser." });
      return;
    }
    setForm({ ...form, locationLoading: true, locationError: "", location: null });
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setForm((prev) => ({
          ...prev,
          locationLoading: false,
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          locationError: "",
        })),
      () =>
        setForm((prev) => ({
          ...prev,
          locationLoading: false,
          locationError: "Unable to retrieve location. Please allow location access.",
        }))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const requestData = {
        deliveryType: form.deliveryType,
        description: form.description,
        location: {
          type: "Point",
          coordinates: [form.location.lng, form.location.lat],
        },
      };

      const res = await axios.post("http://localhost:5000/api/requests/", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const savedRequest = res.data.savedRequest;
      setRequests((prev) => [...prev, savedRequest]);
      setMessage(res.data.message);
      setSubmitted(true);

      setStats((prev) => [
        { ...prev[0], value: prev[0].value + 1 },
        prev[1],
        { ...prev[2], value: prev[2].value + 1 },
      ]);
    } catch (e) {
      console.error("Error submitting request:", e.response?.data?.message || e.message);
      setMessage(e.response?.data?.message || "Failed to make a request.");
      setSubmitted(true);
    }
  };

  const getRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/requests/victim", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const activeRequests = res.data.activeRequests || [];
      setRequests(activeRequests);
      console.log(activeRequests);

      setStats([
        { icon: "bi-gift", label: "Requests Posted", value: res.data.totalCount || 0, color: "green" },
        { icon: "bi-people", label: "Help Got", value: res.data.fulfilledCount || 0, color: "blue" },
        { icon: "bi-hourglass-split", label: "Pending", value: res.data.pendingCount || 0, color: "orange" },
        { icon: "bi-hourglass-split", label: "Requests Accepted", value: res.data.acceptedCount || 0, color: "blue" },
      ]);
    } catch (e) {
      console.error("Error fetching requests:", e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getRequests();
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

  const canSubmit = form.deliveryType && form.description && form.location;

  return (
    <div>
      <Sidebar userData={userData}/>
      <div className="page-title-bar">
        <div>
          <h1>Dashboard Overview | Victim</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i> Home &gt; Overview
          </span>
        </div>
        <span className="breadcrumb-text">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="request-banner" onClick={openModal}>
        <div className="request-banner-icon">
          <i className="bi bi-plus-circle-fill"></i>
        </div>
        <div className="request-banner-text">
          <strong>Need Urgent Assistance? </strong>
          <span>Click here to post a new relief request and get help fast</span>
        </div>
        <div className="request-banner-arrow">
          <i className="bi bi-arrow-right-circle-fill"></i>
        </div>
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
              Your Active Requests
            </h5>
            <div className="map-container" ref={mapRef} style={{ height: 420, borderRadius: 14, zIndex: 0 }}></div>
            {requests.length === 0 && (
              <div className="map-overlay">
                <i className="bi bi-pin-map-fill"></i>
                Only 2 Active Requests are Allowed.
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

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <div className="modal-header-bar">
                  <h5>
                    <i className="bi bi-send-plus me-2"></i>
                    Make a Request
                  </h5>
                  <button className="modal-close-btn" onClick={closeModal}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-form-group">
                    <label>Delivery Type</label>
                    <select
                      name="deliveryType"
                      value={form.deliveryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select delivery type --</option>
                      <option value="Food & Water">Food &amp; Water</option>
                      <option value="Medical Aid">Medical Aid</option>
                      <option value="Shelter">Shelter</option>
                      <option value="Evacuation">Evacuation</option>
                      <option value="Financial Aid">Financial Aid</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe what you need in detail..."
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>Live Location</label>
                    <button
                      type="button"
                      className={`location-btn ${form.location ? "captured" : ""}`}
                      onClick={fetchLocation}
                      disabled={form.locationLoading}
                    >
                      {form.locationLoading ? (
                        <>
                          <span className="spinner"></span>
                          Fetching location...
                        </>
                      ) : form.location ? (
                        <>
                          <i className="bi bi-check-circle-fill"></i>
                          Location Captured
                        </>
                      ) : (
                        <>
                          <i className="bi bi-geo-alt-fill"></i>
                          Get My Live Location
                        </>
                      )}
                    </button>

                    {form.locationError && (
                      <p className="location-error">
                        <i className="bi bi-exclamation-triangle-fill me-1"></i>
                        {form.locationError}
                      </p>
                    )}

                    {form.location && (
                      <div className="location-info">
                        <p>
                          <i className="bi bi-pin-map-fill me-1"></i>
                          <strong>Lat:</strong> {form.location.lat.toFixed(5)} &nbsp;
                          <strong>Lng:</strong> {form.location.lng.toFixed(5)}
                        </p>
                        <div className="modal-map">
                          <iframe
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${form.location.lng - 0.01},${form.location.lat - 0.01},${form.location.lng + 0.01},${form.location.lat + 0.01}&layer=mapnik&marker=${form.location.lat},${form.location.lng}`}
                            title="Your live location"
                            loading="lazy"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="modal-footer-bar">
                    <button type="button" className="btn-secondary-custom" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary-custom" disabled={!canSubmit}>
                      <i className="bi bi-send me-2"></i>
                      Submit Request
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <div className="modal-success-icon">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <h4 style={{ marginBottom: "20px" }}>{message}</h4>
                <button className="btn-primary-custom" onClick={closeModal}>
                  View on Map
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
