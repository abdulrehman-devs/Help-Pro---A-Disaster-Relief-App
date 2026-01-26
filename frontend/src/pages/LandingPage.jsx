import react from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <Header />

            <section className="hero">
                <h1>Help Pro – Disaster Relief & Emergency Assistance</h1>
                <p>A web-based platform designed to support disaster management, emergency response, and relief coordination in real time.</p>
                <div className="button-group">
                    <button className="btn btn-primary">Get Help Now</button>
                    <button className="btn btn-secondary">Admin Login</button>
                </div>
            </section>

            <section className="features" id='features'>
                <h2>Powerful Features</h2>
                <p>Everything you need to manage disasters and coordinate relief efforts</p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Emergency Requests</h3>
                        <p>Users can submit real-time help requests during disasters</p>
                    </div>

                    <div className="feature-card">
                        <h3>Live Location Tracking</h3>
                        <p>Track affected areas and victims using maps</p>
                    </div>

                    <div className="feature-card">
                        <h3>Relief Resource Management</h3>
                        <p>Manage food, medical aid, and shelter availability</p>
                    </div>

                    <div className="feature-card">
                        <h3>Volunteer Coordination</h3>
                        <p>Assign volunteers to nearby emergency cases</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works" id='how'>
                <h2>How It Works</h2>
                <p>Simple, efficient process for disaster management</p>

                <div className="steps-grid">
                    <div className="step">
                        <div className="step-number" style={{ backgroundColor: '#2563eb' }}>1</div>
                        <h3>User reports an emergency</h3>
                        <p>Users submit real-time help requests with their location and requirements</p>
                    </div>

                    <div className="step">
                        <div className="step-number" style={{ backgroundColor: '#f97316' }}>2</div>
                        <h3>Admin verifies requests and assigns resources</h3>
                        <p>Admin verifies requests and assigns resources accordingly</p>
                    </div>

                    <div className="step">
                        <div className="step-number" style={{ backgroundColor: '#16a34a' }}>3</div>
                        <h3>Volunteers and relief teams respond efficiently</h3>
                        <p>Volunteers and relief teams respond quickly to assigned cases</p>
                    </div>
                </div>
            </section>

            <section className="tech-stack" id='tech'>
                <h2>Technology Stack</h2>
                <p>Built with modern technology for reliability and performance</p>

                <div className="tech-grid">
                    <div className="tech-card">
                        <h3 style={{ color: '#2563eb' }}>MERN Stack</h3>
                        <p>MongoDB, Express, React, Node.js</p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#f97316' }}>Real-time Data</h3>
                        <p>Instant updates and live communication</p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#16a34a' }}>Secure Authentication</h3>
                        <p>Robust authentication and encryption</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default LandingPage;
