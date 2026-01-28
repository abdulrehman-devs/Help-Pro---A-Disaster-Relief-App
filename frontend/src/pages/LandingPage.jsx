import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <Header isLoggedIn={false} />

            <section className="hero">
                <h1>Help Pro - Disaster Relief & Emergency Assistance</h1>
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
                        <p>
                            Users can submit real-time emergency help requests during disasters,
                            allowing affected individuals to quickly report their situation and
                            request immediate assistance from nearby responders.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Live Location Tracking</h3>
                        <p>
                            The application enables live location tracking using interactive maps,
                            helping authorities and volunteers identify affected areas, victims,
                            and safe routes in real time.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Relief Resource Management</h3>
                        <p>
                            Relief teams can efficiently manage and monitor the availability of
                            essential resources such as food supplies, medical aid, and temporary
                            shelters to ensure proper distribution.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Volunteer Coordination</h3>
                        <p>
                            The system helps coordinate volunteers by assigning them to nearby
                            emergency cases based on location, availability, and priority,
                            improving response time during critical situations.
                        </p>
                    </div>
                </div>
            </section>

            <section className="how-it-works" id='how'>
                <h2>How It Works</h2>
                <p>Simple, efficient process for disaster management</p>

                <div className="steps-slider">
                    <div className="steps-track">
                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#2563eb'}}>1</div>
                            <h3>User reports an emergency</h3>
                            <p>
                                Users can submit real-time emergency help requests by providing their
                                current location, type of emergency, and specific requirements to
                                ensure faster and more accurate assistance.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#f97316' }}>2</div>
                            <h3>Admin verifies requests and assigns resources</h3>
                            <p>
                                The admin carefully verifies each request, prioritizes emergencies,
                                and assigns available resources such as medical aid, food supplies,
                                or rescue teams based on urgency.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#16a34a' }}>3</div>
                            <h3>Volunteers and relief teams respond efficiently</h3>
                            <p>
                                Nearby volunteers and relief teams receive assigned tasks and respond
                                efficiently to emergency cases, ensuring timely support and effective
                                disaster response.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#8b5cf6' }}>4</div>
                            <h3>Feedback & Reporting</h3>
                            <p>
                                After assistance is provided, users and volunteers can submit feedback,
                                allowing admins to review response quality and improve future disaster management.
                            </p>
                        </div>

                        {/* Duplicate steps for infinite scroll */}
                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#2563eb' }}>1</div>
                            <h3>User reports an emergency</h3>
                            <p>
                                Users can submit real-time emergency help requests by providing their
                                current location, type of emergency, and specific requirements to
                                ensure faster and more accurate assistance.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#f97316' }}>2</div>
                            <h3>Admin verifies requests and assigns resources</h3>
                            <p>
                                The admin carefully verifies each request, prioritizes emergencies,
                                and assigns available resources such as medical aid, food supplies,
                                or rescue teams based on urgency.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#16a34a' }}>3</div>
                            <h3>Volunteers and relief teams respond efficiently</h3>
                            <p>
                                Nearby volunteers and relief teams receive assigned tasks and respond
                                efficiently to emergency cases, ensuring timely support and effective
                                disaster response.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number" style={{ backgroundColor: '#8b5cf6' }}>4</div>
                            <h3>Feedback & Reporting</h3>
                            <p>
                                After assistance is provided, users and volunteers can submit feedback,
                                allowing admins to review response quality and improve future disaster management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            <section className="tech-stack" id='tech'>
                <h2>Technology Stack</h2>

                <div className="tech-grid">
                    <div className="tech-card">
                        <h3 style={{ color: '#2563eb' }}>MERN Stack</h3>
                        <p>
                            MongoDB, Express, React, Node.js. <br />
                            Enables building fast and scalable full-stack web applications.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#f97316' }}>Real-time Data</h3>
                        <p>
                            Instant updates and live communication. <br />
                            Keeps users informed instantly with up-to-date information.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#f59e0b' }}>Monitoring & Alerts</h3>
                        <p>
                            Real-time notifications and monitoring ensure prompt response to emergencies. <br />
                            Helps track system performance and disaster updates efficiently.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#8b5cf6' }}>System Architecture</h3>
                        <p>
                            The app uses REST APIs for backend communication, integrating weather and disaster data APIs. <br />
                            Efficient routing and database interactions ensure smooth operations.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#ec4899' }}>Tools</h3>
                        <p>
                            VS Code, Linux, Postman API, Git, GitHub. <br />
                            Essential for development, testing, version control, and deployment.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 style={{ color: '#16a34a' }}>Secure Authentication</h3>
                        <p>
                            Robust authentication and encryption. <br />
                            Ensures user data is protected at all times.
                        </p>
                    </div>

                </div>

            </section>

            <Footer />
        </div>
    );
}

export default LandingPage;
