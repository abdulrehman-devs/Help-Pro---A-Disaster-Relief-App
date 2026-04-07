import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../style/UserFeedbacks.css';

export default function UserFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        type: 'all',
        rating: 'all',
        search: ''
    });

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/feedbacks/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFeedbacks(res.data.allFeedbacks || []);
            setLoading(false);
        } catch (e) {
            console.error("Error fetching feedbacks:", e.response?.data || e.message);
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const getFilteredFeedbacks = () => {
        return feedbacks.filter(feedback => {
            const matchesType = filter.type === 'all' || feedback.type === filter.type;
            const matchesRating = filter.rating === 'all' || feedback.rating === filter.rating;
            const matchesSearch = filter.search === '' || 
                feedback.subject.toLowerCase().includes(filter.search.toLowerCase()) ||
                feedback.message.toLowerCase().includes(filter.search.toLowerCase());
            
            return matchesType && matchesRating && matchesSearch;
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            try {
                const token = localStorage.getItem("adminToken");
                await axios.delete(`http://localhost:5000/api/feedbacks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setFeedbacks(feedbacks.filter(f => f._id !== id));
            } catch (e) {
                console.error("Error deleting feedback:", e.response?.data || e.message);
            }
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            feedback: '#28a745',
            report: '#dc3545',
            complaint: '#ffc107',
            suggestion: '#17a2b8'
        };
        return colors[type] || '#6c757d';
    };

    const getRatingStars = (rating) => {
        const stars = '⭐'.repeat(parseInt(rating));
        const empty = '☆'.repeat(5 - parseInt(rating));
        return stars + empty;
    };

    const filteredFeedbacks = getFilteredFeedbacks();

    return (
        <div className="user-feedbacks-container">
            <div className="page-title-bar">
                <div>
                    <h1>User Feedbacks</h1>
                    <span className="breadcrumb-text">
                        <i className="bi bi-house-door me-1"></i>Home &gt; User Feedbacks
                    </span>
                </div>
                <span className="breadcrumb-text">
                    Total: {filteredFeedbacks.length} feedbacks
                </span>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="filters-card">
                        <h6>Filters</h6>
                        
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select 
                                className="form-control" 
                                name="type" 
                                value={filter.type} 
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Types</option>
                                <option value="feedback">Feedback</option>
                                <option value="report">Report</option>
                                <option value="complaint">Complaint</option>
                                <option value="suggestion">Suggestion</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Rating</label>
                            <select 
                                className="form-control" 
                                name="rating" 
                                value={filter.rating} 
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Ratings</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Search</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="search" 
                                value={filter.search}
                                onChange={handleFilterChange}
                                placeholder="Search feedbacks..."
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="feedbacks-table-card">
                        <h6>
                            <i className="bi bi-chat-square-text me-2" style={{ color: "#6c5ce7" }}></i>
                            All User Feedbacks
                        </h6>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="loading-text">Loading feedbacks...</p>
                            </div>
                        ) : filteredFeedbacks.length === 0 ? (
                            <div className="empty-state">
                                <i className="bi bi-inbox empty-icon"></i>
                                <p className="empty-text">No feedbacks found matching your criteria</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Type</th>
                                            <th>Rating</th>
                                            <th>User</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFeedbacks.map((feedback) => (
                                            <tr key={feedback._id}>
                                                <td>
                                                    <div className="feedback-subject">{feedback.subject}</div>
                                                    <div className="feedback-preview">
                                                        {feedback.message.substring(0, 100)}
                                                        {feedback.message.length > 100 && '...'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="type-badge" style={{ 
                                                        backgroundColor: getTypeColor(feedback.type)
                                                    }}>
                                                        {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="rating-stars" title={getRatingStars(feedback.rating)}>
                                                        {getRatingStars(feedback.rating)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="user-info">
                                                        <div className="user-name">{feedback.userId?.name || 'Unknown'}</div>
                                                        <div className="user-email">{feedback.userId?.email || 'No email'}</div>
                                                        <div className="user-role">Role: {feedback.role || 'N/A'}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="datetime-info">
                                                        <div className="date-text">{new Date(feedback.createdAt).toLocaleDateString()}</div>
                                                        <div className="time-text">{new Date(feedback.createdAt).toLocaleTimeString()}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button 
                                                        className="btn-delete"
                                                        onClick={() => handleDelete(feedback._id)}
                                                        title="Delete feedback"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
