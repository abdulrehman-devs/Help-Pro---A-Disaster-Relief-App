import { useOutletContext } from "react-router-dom";
import "../../style/AdminNavbar.css";

const Home = () => {
    const { usersData = {}, requests = {} } = useOutletContext();

    const stats = [
        { label: "Total Users", value: usersData.totalUsers || 0, icon: "bi-people-fill", color: "bg-light text-dark" },
        { label: "Total Donors", value: usersData.totalDonors || 0, icon: "bi-person-check-fill", color: "bg-success text-white" },
        { label: "Total Victims", value: usersData.totalVictims || 0, icon: "bi-person-x-fill", color: "bg-danger text-white" },

        { label: "Total Requests", value: requests.totalRequests || 0, icon: "bi-card-list", color: "bg-info text-white" },
        { label: "Active Requests", value: requests.activeRequests || 0, icon: "bi-clock-fill", color: "bg-primary text-white" },
        { label: "Pending Requests", value: requests.pendingRequests || 0, icon: "bi-hourglass-split", color: "bg-warning text-dark" },
        { label: "Completed Requests", value: requests.completedRequests || 0, icon: "bi-check-circle-fill", color: "bg-success text-white" },
        { label: "Disputed Requests", value: requests.disputedRequests || 0, icon: "bi-exclamation-triangle-fill", color: "bg-danger text-white" },
    ];

    return (
        <div className="home-wrapper" style={{marginTop: "200px", width: "90vw", marginLeft: "30px"}}>
            <div className="cards-wrapper">
                <div className="row g-3 mb-4">
                    {stats.map((s, i) => (
                        <div className="col-lg-3 col-md-6 stats" key={i}>
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
            </div>
        </div>
    );
};

export default Home;