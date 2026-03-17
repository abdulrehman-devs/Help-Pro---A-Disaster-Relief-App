import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import { Outlet } from 'react-router-dom';
import axios from "axios";

const AdminLayout = () => {

    const [usersData, setUsersData] = useState({
        totalUsers: 0,
        totalDonors: 0,
        totalVictims: 0,
        users: []
    });

    const [requests, setRequests] = useState({
        totalRequests: 0,
        activeRequests: 0,
        pendingRequests: 0,
        requests: []
    });

    const getUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsersData(res.data || {
                totalUsers: 0,
                totalDonors: 0,
                totalVictims: 0,
                users: []
            });

        } catch (e) {
            console.error("Error fetching users:", e.response?.data || e.message);
        }
    };

    const getRequests = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/admin/requests", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setRequests(res.data || {
                totalRequests: 0,
                activeRequests: 0,
                pendingRequests: 0,
                completedRequests: 0,
                requests: []
            });

        } catch (e) {
            console.error("Error fetching requests:", e.response?.data || e.message);
        }
    };

    useEffect(() => {
        getUsers();
        getRequests();
    }, []);

    return (
        <div className='main-wrapper'>
            <Navbar />
            <div className="main">
                <Outlet context={{ usersData, requests }} />
            </div>
        </div>
    );
}

export default AdminLayout;