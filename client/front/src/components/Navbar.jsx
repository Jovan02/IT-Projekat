import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul class="nav-elements">
                    <li class="nav-element">
                        <Link to="/">Home</Link>
                    </li>
                    <li class="nav-element">
                        <Link to="/browse">Browse</Link>
                    </li>
                    <li class="nav-element">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li class="nav-element nav-right nav-last-element">
                        <Link to="/register">Register</Link>
                    </li>
                    <li class="nav-element nav-right">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
