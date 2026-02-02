import "../style/Header.css";
import { Link } from "react-router-dom";
import React from "react";

function Header({ isLoggedIn }) {
    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg" >
                <div className="container">

                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src="/helpro-logo.jpg"
                            alt="Help Pro Logo"
                            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                        />
                        <span className="app-name">Help Pro</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarMenu">

                        { !isLoggedIn &&
                            <ul className="navbar-nav mx-auto align-items-lg-center">
                                <li className="nav-item">
                                    <a className="nav-link" href="#features">FEATURES</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#how">HOW IT WORKS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#tech">TECHNOLOGY</a>
                                </li>
                            </ul>}

                        <div className="d-flex ms-auto gap-1">
                            { !isLoggedIn ? 
                            (
                                <>
                                    <Link className="login-btn" to="/login"> Log in </Link>
                                    <Link className="btn btn-primary" to="/register"> Register Now </Link>
                                </>
                            ) : 
                            (
                                <button className="btn btn-primary" style={{ "width": "100px", "height": "40px", "fontSize": "14px", "padding": "0 10px", "textDecoration": "none"}}>Sign Out</button>
                            )
                                }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;

