import { useEffect, useState } from "react";
import axios from 'axios';
import '../style/Dashboard.css';
import Sidebar from '../components/sidebar';
import { useOutletContext } from "react-router-dom";

export default function VictimFeedback() {
  const [form, setForm] = useState({
    type: "feedback",
    subject: "",
    message: "",
    rating: "5",
  });
  const [submitted, setSubmitted] = useState(false);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  const {userData} = useOutletContext();

  useEffect(() => {
    const fetchRecentFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/feedbacks/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecentFeedbacks(res.data.userFeedbacks);

      }
      catch (e) {
        console.log("Some error occured while fetching recent feedbacks.", e)
      }
    }

    fetchRecentFeedbacks();
  }, [recentFeedbacks])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/feedbacks/",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
    }
    catch (e) {
      console.log("Problem occurred while giving feedback", e);
    }
    setRecentFeedbacks(prev => [form, ...prev])
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ type: "feedback", subject: "", message: "", rating: "5" });
    }, 3000);
  };

  return (
    <div>
      <Sidebar userData={userData} />
      <div className="page-title-bar">
        <div>
          <h1>Feedback & Report</h1>
          <span className="breadcrumb-text">
            <i className="bi bi-house-door me-1"></i>Home &gt; Feedback
          </span>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="dash-card">
            <div className="form-section">
              <h5 style={{ fontWeight: 700, marginBottom: 20 }}>
                <i className="bi bi-chat-square-text me-2" style={{ color: "#6c5ce7" }}></i>
                Submit Feedback or Report
              </h5>

              {submitted && (
                <div className="success-message mb-4">
                  <i className="bi bi-check-circle-fill"></i>
                  Your {form.type} has been submitted successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Type</label>
                    <select className="form-control" name="type" value={form.type} onChange={handleChange}>
                      <option value="feedback">Feedback</option>
                      <option value="report">Report an Issue</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Rating</label>
                    <select className="form-control" name="rating" value={form.rating} onChange={handleChange}>
                      <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4">⭐⭐⭐⭐ Good</option>
                      <option value="3">⭐⭐⭐ Average</option>
                      <option value="2">⭐⭐ Poor</option>
                      <option value="1">⭐ Very Poor</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Brief subject of your feedback"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Describe your feedback or issue in detail..."
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 mt-3">
                    <button type="submit" className="btn-primary-custom">
                      <i className="bi bi-send me-2"></i>Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="dash-card">
            <h5 style={{ fontWeight: 700, marginBottom: 16 }}>
              <i className="bi bi-info-circle me-2" style={{ color: "#00b894" }}></i>
              Guidelines
            </h5>
            <ul style={{ paddingLeft: 18, fontSize: "0.88rem", color: "#636e72", lineHeight: 2 }}>
              <li>Be specific about your experience</li>
              <li>Include request IDs if reporting an issue</li>
              <li>Feedback helps improve our services</li>
              <li>Reports are reviewed within 24 hours</li>
              <li>You can track report status in history</li>
            </ul>
          </div>

          <div className="dash-card mt-4">
            <h5 style={{ fontWeight: 700, marginBottom: 16 }}>
              <i className="bi bi-clock-history me-2" style={{ color: "#e17055" }}></i>
              Recent Submissions
            </h5>

            {recentFeedbacks.map((item) => (
              <div className="activity-item" key={item._id}>
                <div className="activity-dot green"></div>
                <div className="activity-text">
                  {item.subject}
                  <span className="time">
                    Submitted · {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
