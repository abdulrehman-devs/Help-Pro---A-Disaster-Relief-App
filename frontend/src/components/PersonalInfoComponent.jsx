import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar";

function PersonalInfoComponent ({role}) {

  const {userData} = useOutletContext();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (userData) {
      setForm(userData);
      setSaved(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowSuccess(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "http://localhost:5000/api/user/update/info",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log("Problem occurred while updating data", e);
    }

    setSaved(form);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setForm(saved);
    setIsEditing(false);
    setShowSuccess(false);
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <Sidebar userData={userData} />
      <div className="page-title-bar">
        <div>
          <h1>Personal Info</h1>
          <span className="breadcrumb-text">Home &gt; Personal Info</span>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          {!isEditing ? (
            <button className="btn-primary-custom" onClick={handleEdit}>
              <i className="bi bi-pencil-square" style={{ marginRight: "8px" }}></i>
              Edit
            </button>
          ) : (
            <>
              <button className="btn-secondary-custom" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn-primary-custom" onClick={handleSave}>
                <i className="bi bi-check-lg" style={{ marginRight: "8px" }}></i>
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="success-message" style={{ marginBottom: "24px" }}>
          <i className="bi bi-check-circle-fill"></i>
          Personal information updated successfully.
        </div>
      )}

      {!isEditing && (
        <div
          className="success-message"
          style={{ marginBottom: "24px", background: "#fff3cd", color: "#856404" }}
        >
          <i className="bi bi-lock-fill"></i>
          Click "Edit" to modify your information.
        </div>
      )}

      {/* Form */}
      <div className="dash-card">
        <div className="form-section" style={{ maxWidth: "100%" }}>
          <div className="row g-4">
            {["name","email","phone","city","address"].map((field) => (
              <div className={field==="address"?"col-12":"col-md-6"} key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field==="address" ? (
                  <textarea
                    className="form-control"
                    name={field}
                    value={form[field] || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                  />
                ) : (
                  <input
                    type={field==="email"?"email":"text"}
                    className="form-control"
                    name={field}
                    value={form[field] || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
            ))}

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={form.role || ""}
                disabled
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoComponent;