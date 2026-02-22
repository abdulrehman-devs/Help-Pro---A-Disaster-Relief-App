import Sidebar from "./sidebar";
import axios from "axios";
import "../style/Dashboard.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/user/get/info", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data);
      } catch (e) {
        console.log("Error fetching user", e);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar userData={userData} />
      <main className="main-content">
        <Outlet context={{ userData }} />
      </main>
    </div>
  );
}