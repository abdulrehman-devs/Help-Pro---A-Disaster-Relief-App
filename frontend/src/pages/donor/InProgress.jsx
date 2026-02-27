import React, { useEffect, useState } from "react";
import Sidebar from '../../components/sidebar';
import '../../style/Dashboard.css';
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const InProgress = () => {
  const [requests, setRequests] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [showOtpField, setShowOtpField] = useState({});

  const { userData } = useOutletContext();

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/donor?type=Accepted",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSendOtp = async (requestId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/requests/donor/send-otp/${requestId}`,
        {}, // empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowOtpField(prev => ({ ...prev, [requestId]: true }));
      alert("OTP sent successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to send OTP. Check your login.");
    }
  };

  const handleOtpChange = (requestId, value) => {
    setOtpInputs(prev => ({ ...prev, [requestId]: value }));
  };

  const otpVerify = async (requestId) => {
    const token = localStorage.getItem("token");
    const otpValue = otpInputs[requestId];

    if (!otpValue || otpValue.trim() === "") {
      alert("Please enter OTP before verifying.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/requests/donor/verify-otp/${requestId}`,
        { otp: otpValue.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("OTP Verified Successfully!");
      console.log(res.data);
      fetchRequests();
    }
    catch (error) {
      alert(error.response?.data?.message || "Incorrect OTP or server error.");
    }
  };

  return (
    <>
      <Sidebar userData={userData} />
      <div className="page-title-bar">
        <div>
          <h1>In Progress Requests</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i>Home &gt; In Progress
          </span>
        </div>
        <span className="breadcrumb-text date">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
        {requests.length === 0 && <p>No in-progress requests.</p>}

        {requests.map(req => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              background: "#f9f9f9",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>Type:</strong> {req.deliverytype || ""}</p>
            <p><strong>Description:</strong> {req.description || ""}</p>
            <p><strong>Phone:</strong> {req.victim?.phone}</p>
            <p><strong>Victim:</strong> {req.victim?.name}</p>
            <p><strong>City:</strong> {req.victim?.city}</p>
            <p><strong>Address:</strong> {req.victim?.address}</p>

            {/* Show Send OTP button if OTP field is not visible */}
            {!showOtpField[req._id] ? (
              <button
                onClick={() => handleSendOtp(req._id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#3498db",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginTop: "12px",
                }}
              >
                Send OTP to Victim
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpInputs[req._id] || ""}
                  onChange={(e) => handleOtpChange(req._id, e.target.value)}
                  style={{
                    flex: "1",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() => otpVerify(req._id)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#2ecc71",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default InProgress;