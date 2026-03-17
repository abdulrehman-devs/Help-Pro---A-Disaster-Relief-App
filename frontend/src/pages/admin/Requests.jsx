import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Requests = () => {
    const { requests: requestsData = {} } = useOutletContext();
    const requests = requestsData.requests || []; 

    return (
        <div className="page-wrapper" style={{marginTop: "100px", width: "90vw", marginLeft: "50px"}}>
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
                            <th>_id</th>
                            <th>Delivery Type</th>
                            <th>Victim Name</th>
                            <th>Victim Phone</th>
                            <th>Victim City</th>
                            <th>Donor Name</th>
                            <th>Donor Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? requests.map((req, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: "700" }}>{req._id}</td>
                                <td>{req.deliveryType}</td>
                                <td>{req.name || "N/A"}</td>
                                <td>{req.phone || "N/A"}</td>
                                <td>{req.city || "N/A"}</td>
                                <td>{req.donor?.name || "Not assigned"}</td>
                                <td>{req.donor?.phone || "N/A"}</td>
                                <td>{req.status}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                                    No requests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Requests;