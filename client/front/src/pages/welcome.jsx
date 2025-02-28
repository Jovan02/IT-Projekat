import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";
const Welcome = () => {
    return (
        <div className="main-welcome">
            <div className="main-container">
                <h1 className="main-title">CINEMAXX</h1>
                <Link to="/login" className="main-button">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
