import React, { useState } from "react";

const initialData = {
  name: "Ali Hassan",
  email: "ali.hassan@email.com",
  contact: "+92 321 9876543",
  address: "Office 5, Block B, Blue Area, Islamabad",
  cnic: "61101-9876543-2",
  organization: "Hassan Relief Foundation",
  city: "Islamabad",
  donorType: "Organization",
};

function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialData);
  const [saved, setSaved] = useState(initialData);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowSuccess(false);
  };

  const handleSave = () => {
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

  return (
    <div>
      <div className="page-title-bar">
        <div>
          <h1>Personal Info</h1>
          <span className="breadcrumb-text">Donor Dashboard / Personal Info</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
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
        <div className="success-message" style={{ marginBottom: "24px", background: "#fff3cd", color: "#856404" }}>
          <i className="bi bi-lock-fill"></i>
          Click "Edit" to modify your information.
        </div>
      )}

      <div className="dash-card">
        <div className="form-section" style={{ maxWidth: "100%" }}>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">CNIC</label>
              <input
                type="text"
                className="form-control"
                name="cnic"
                value={form.cnic}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Organization / Entity</label>
              <input
                type="text"
                className="form-control"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Donor Type</label>
              <select
                className="form-select"
                name="donorType"
                value={form.donorType}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option>Individual</option>
                <option>Organization</option>
                <option>NGO</option>
                <option>Government</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Full Address</label>
              <textarea
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
