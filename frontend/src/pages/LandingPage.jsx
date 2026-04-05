import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/LandingPaage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="landing-page">
            <Header isLoggedIn={false} />

            <main className="landing-main">
               
            <section className="hero" aria-labelledby="landing-title">
                    <div className="container hero-container">
                        <div className="hero-content">
                            <span className="hero-badge">Real-time disaster relief coordination</span>

                        <h1 id="landing-title">Help Pro: Faster Emergency Response</h1>
                        <p className="hero-subtitle">
                            Victims can post verified needs with their live location. Donors and volunteers can
                            find and respond to nearby requests quickly and transparently.
                        </p>

                        <div className="button-group" role="group" aria-label="Primary actions">
                            <Link className="btn btn-primary" to="/signup">Get Help Now</Link>
                            <Link className="btn btn-secondary" to="/admin-signin">Admin Login</Link>
                        </div>

                        </div>
                    </div>
            </section>

            <section className="section value-prop" aria-labelledby="value-title">
                    <div className="container">
                        <div className="value-layout">
                            <div className="value-copy">
                                <h2 id="value-title">Relief that’s coordinated in real time</h2>
                                <p className="value-subtitle">
                                    During emergencies, delays can cost lives. Help Pro streamlines how requests are posted,
                                    verified, and matched to the nearest available help—so aid reaches the right people faster.
                                </p>

                                <ul className="value-list">
                                    <li>
                                        <span className="value-check" aria-hidden="true">✓</span>
                                        Clear request categories: food, shelter, medical assistance, and more.
                                    </li>
                                    <li>
                                        <span className="value-check" aria-hidden="true">✓</span>
                                        Live location awareness to prioritize the closest available help.
                                    </li>
                                    <li>
                                        <span className="value-check" aria-hidden="true">✓</span>
                                        Transparent status updates for victims, donors, and volunteers.
                                    </li>
                                </ul>

                                <div className="value-actions" role="group" aria-label="Secondary actions">
                                    <Link className="btn btn-primary" to="/signup">Join as a Helper</Link>
                                    <Link className="btn btn-secondary" to="/signin">Sign in</Link>
                                </div>
                            </div>

                            <div className="value-visual" aria-label="Matching signals overview">
                                <div className="signal">
                                    <div className="signal-top">
                                        <span className="signal-title">Distance priority</span>
                                        <span className="signal-pill">Nearby first</span>
                                    </div>
                                    <div className="signal-bar"><span style={{ width: '78%' }} /></div>
                                </div>
                                <div className="signal">
                                    <div className="signal-top">
                                        <span className="signal-title">Availability</span>
                                        <span className="signal-pill">Open now</span>
                                    </div>
                                    <div className="signal-bar"><span style={{ width: '66%' }} /></div>
                                </div>
                                <div className="signal">
                                    <div className="signal-top">
                                        <span className="signal-title">Urgency</span>
                                        <span className="signal-pill">Critical</span>
                                    </div>
                                    <div className="signal-bar"><span style={{ width: '84%' }} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <section className="section features" id="features" aria-labelledby="features-title">
                <div className="container">
                    <div className="section-header">
                        <h2 id="features-title">Powerful Features</h2>
                        <p>Everything you need to manage disasters and coordinate relief efforts—fast, clear, and location-aware.</p>
                    </div>

                    <div className="feature-carousel" aria-roledescription="carousel">
                        <input type="radio" name="feature-carousel" id="feature-1" defaultChecked />
                        <input type="radio" name="feature-carousel" id="feature-2" />
                        <input type="radio" name="feature-carousel" id="feature-3" />
                        <input type="radio" name="feature-carousel" id="feature-4" />

                        <div className="feature-carousel-slides">
                            <section className="feature-slide feature-slide--requests" aria-label="Emergency Requests">
                                <div className="feature-slide-icon" aria-hidden="true">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22s7-4.35 7-10.2C19 7.02 16.31 4 12 4S5 7.02 5 11.8C5 17.65 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M12 11v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M12 8.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h3>Emergency Requests</h3>
                                <p>Victims submit urgent needs with clear details and their current location to trigger faster assistance.</p>
                            </section>

                            <section className="feature-slide feature-slide--location" aria-label="Live Location Tracking">
                                <div className="feature-slide-icon" aria-hidden="true">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22s7-4.35 7-10.2C19 7.02 16.31 4 12 4S5 7.02 5 11.8C5 17.65 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M12 14a2.2 2.2 0 1 0 0-4.4A2.2 2.2 0 0 0 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3>Live Location Tracking</h3>
                                <p>Interactive maps help donors and volunteers identify nearby requests and plan safe, effective routes.</p>
                            </section>

                            <section className="feature-slide feature-slide--resources" aria-label="Relief Resource Management">
                                <div className="feature-slide-icon" aria-hidden="true">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 7 12 3 4 7l8 4 8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M4 7v10l8 4 8-4V7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M12 11v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h3>Relief Resource Management</h3>
                                <p>Teams track available supplies such as food, medical aid, and shelters for accurate distribution.</p>
                            </section>

                            <section className="feature-slide feature-slide--volunteers" aria-label="Volunteer Coordination">
                                <div className="feature-slide-icon" aria-hidden="true">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M17 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h3>Volunteer Coordination</h3>
                                <p>Nearby helpers are assigned based on proximity, availability, and priority—improving response times.</p>
                            </section>
                        </div>

                        <div className="feature-carousel-nav" aria-label="Feature carousel navigation">
                            <label htmlFor="feature-1" aria-label="Emergency Requests"></label>
                            <label htmlFor="feature-2" aria-label="Live Location Tracking"></label>
                            <label htmlFor="feature-3" aria-label="Relief Resource Management"></label>
                            <label htmlFor="feature-4" aria-label="Volunteer Coordination"></label>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section trust" aria-labelledby="trust-title">
                <div className="container">
                    <div className="section-header section-header--center">
                        <h2 id="trust-title">Verification & Accountability</h2>
                        <p>
                            Help Pro improves reliability through structured coordination and clear communication across all participants.
                        </p>
                    </div>

                    <div className="trust-grid" role="list">
                        <div className="trust-item" role="listitem">
                            <div className="trust-icon" aria-hidden="true">🔎</div>
                            <div className="trust-copy">
                                <h3>Validated needs</h3>
                                <p>Admins review requests and prioritize the most urgent situations first.</p>
                            </div>
                        </div>

                        <div className="trust-item" role="listitem">
                            <div className="trust-icon" aria-hidden="true">📍</div>
                            <div className="trust-copy">
                                <h3>Location-aware matching</h3>
                                <p>Donors and volunteers are connected based on proximity, availability, and priority.</p>
                            </div>
                        </div>

                        <div className="trust-item" role="listitem">
                            <div className="trust-icon" aria-hidden="true">✅</div>
                            <div className="trust-copy">
                                <h3>Transparent updates</h3>
                                <p>Status changes keep victims and helpers informed throughout the response.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section feedbacks" id="feedbacks" aria-labelledby="feedbacks-title">
                <div className="container">
                    <div className="section-header section-header--center">
                        <h2 id="feedbacks-title">What Communities Say</h2>
                        <p>
                            Clear communication, faster matching, and verified coordination help deliver support
                            when it matters most.
                        </p>
                    </div>

                    <div className="feedback-grid">
                        <article className="feedback-card">
                            <div className="feedback-rating" aria-label="5 out of 5 stars">
                                ★★★★★
                            </div>
                            <p className="feedback-quote">
                                “We posted our location and needs, and help arrived much sooner than expected.
                                The updates made everything feel organized.”
                            </p>
                            <div className="feedback-meta">
                                <span className="feedback-avatar" aria-hidden="true">A</span>
                                <div className="feedback-person">
                                    <div className="feedback-name">Amina K.</div>
                                    <div className="feedback-role">Victim</div>
                                </div>
                            </div>
                        </article>

                        <article className="feedback-card">
                            <div className="feedback-rating" aria-label="5 out of 5 stars">
                                ★★★★★
                            </div>
                            <p className="feedback-quote">
                                “As a donor, it was easy to see nearby requests. The matching felt efficient and
                                transparent.”
                            </p>
                            <div className="feedback-meta">
                                <span className="feedback-avatar" aria-hidden="true">R</span>
                                <div className="feedback-person">
                                    <div className="feedback-name">Rahul S.</div>
                                    <div className="feedback-role">Donor</div>
                                </div>
                            </div>
                        </article>

                        <article className="feedback-card">
                            <div className="feedback-rating" aria-label="5 out of 5 stars">
                                ★★★★★
                            </div>
                            <p className="feedback-quote">
                                “The assignment details were clear. We could coordinate quickly and focus on the
                                most urgent cases first.”
                            </p>
                            <div className="feedback-meta">
                                <span className="feedback-avatar" aria-hidden="true">M</span>
                                <div className="feedback-person">
                                    <div className="feedback-name">Mariam T.</div>
                                    <div className="feedback-role">Volunteer</div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="section tech-stack" id="tech" aria-labelledby="tech-title">
                <div className="container">
                    <div className="section-header section-header--center">
                        <h2 id="tech-title">Technology Stack</h2>
                        <p>Modern tools that support a responsive and reliable disaster relief experience.</p>
                    </div>

                    <ul className="tech-list" aria-label="Technology stack list">
                        <li className="tech-item">
                            <img className="tech-icon tech-icon--mern" src="/mern-logo.jpg" alt="MERN" />
                            <span className="tech-name">MERN</span>
                        </li>
                        <li className="tech-item">
                            <img className="tech-icon" src="/git.webp" alt="Git & GitHub" />
                            <span className="tech-name">Git &amp; GitHub</span>
                        </li>
                        <li className="tech-item">
                            <img className="tech-icon" src="/linux.webp" alt="Linux" />
                            <span className="tech-name">Linux</span>
                        </li>
                        <li className="tech-item">
                            <img className="tech-icon" src="/vscodesvg.png" alt="VS Code" />
                            <span className="tech-name">VS Code</span>
                        </li>
                        <li className="tech-item">
                            <img className="tech-icon" src="/postman.webp" alt="Postman" />
                            <span className="tech-name">Postman</span>
                        </li>
                    </ul>
                </div>

            </section>

            <section className="section faq" id='faq' aria-labelledby="faq-title">
                <div className="container">
                    <div className="section-header section-header--center">
                        <h2 id="faq-title">Frequently Asked Questions</h2>
                        <p>Quick answers about requests, matching, and coordination during emergencies.</p>
                    </div>

                    <div className="faq-grid">
                        <details className="faq-item">
                            <summary>How does the matching work?</summary>
                            <p>
                                Help Pro connects requests with nearby helpers using distance, availability, and urgency.
                            </p>
                        </details>

                        <details className="faq-item">
                            <summary>Can victims share live location?</summary>
                            <p>
                                Yes. Victims can submit live location so donors and volunteers can quickly find nearby requests.
                            </p>
                        </details>

                        <details className="faq-item">
                            <summary>What support roles are available?</summary>
                            <p>
                                Victims post needs, donors provide resources, volunteers respond on-site, and admins coordinate and verify requests.
                            </p>
                        </details>

                        <details className="faq-item">
                            <summary>How do I get started?</summary>
                            <p>
                                Use the buttons above to sign up as a victim, donor, volunteer, or admin and begin coordinating support.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            <section className="cta-banner" aria-label="Final call to action">
                <div className="container cta-inner">
                    <div className="cta-copy">
                        <h2>Ready to help?</h2>
                        <p>
                            Join Help Pro to respond faster and support communities during disasters and emergencies.
                        </p>
                    </div>
                    <div className="cta-buttons" role="group" aria-label="Call to action buttons">
                        <Link className="btn btn-primary" to="/signup">Get Help Now</Link>
                        <Link className="btn btn-secondary" to="/signin">Volunteer Sign In</Link>
                    </div>
                </div>
            </section>

            </main>

            <Footer />
        </div>
    );
}

export default LandingPage;
