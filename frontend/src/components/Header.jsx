import "../style/Header.css";
import React from 'react';

function Header() {
    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <div className="logo-box"></div>
                        <span className="app-name">Help Pro</span>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <ul className="navbar-nav ms-auto align-items-lg-center">
                            <li className="nav-item">
                                <a className="nav-link" href="#features">Features</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#how">How It Works</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#tech">Technology</a>
                            </li>

                            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                                <button className="btn">
                                    Register Now
                                </button>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
