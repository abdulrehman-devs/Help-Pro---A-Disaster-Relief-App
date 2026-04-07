import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Users = () => {
    const { usersData = {} } = useOutletContext();
    const users = usersData.users || [];
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-wrapper" style={{marginTop: "100px", width: "90vw", marginLeft: "50px"}}>
            <div className="page-title-bar">
                <div>
                    <h1>Users</h1>
                    <span className="breadcrumb-text">
                        <i className="bi bi-house-door me-1"></i> Home &gt; Users
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search users by email or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '250px', padding: '8px 12px' }}
                    />
                    <span className="breadcrumb-text">
                        Found: {filteredUsers.length} users
                    </span>
                </div>
            </div>

            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>_id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>City</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user, i) => (
                            <tr key={user._id}>
                                <td style={{ fontWeight: "700" }}>{user._id}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email || "N/A"}</td>
                                <td>{user.phone || "N/A"}</td>
                                <td>{user.role || "N/A"}</td>
                                <td>{user.city || "N/A"}</td>
                                <td>{user.address || "N/A"}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;