import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";
const Welcome = () => {
    return (
        <div class="main-welcome">
            <div class="main-container">
                <h1 class="main-title">CINEMAXX</h1>
                <Link to="/login" class="main-button">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
