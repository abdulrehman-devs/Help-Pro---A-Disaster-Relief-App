import '../style/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">

                    <div className="footer-section">
                        <h3 className="footer-title">Help Pro</h3>
                        <p className="footer-tagline">Helping People When It Matters Most</p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-section-title">Quick Links</h4>
                        <nav className="footer-links">
                            <a href="#features">Features</a>
                            <a href="#how">How it Works?</a>
                            <a href="#tech">Technology</a>
                        </nav>
                    </div>
                </div>

                <div className="footer-divider"></div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Help Pro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;