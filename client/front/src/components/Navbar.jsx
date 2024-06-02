import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/welcome");
    };

    return (
        <header>
            <nav>
                <ul class="nav-elements">
                    <li class="nav-element">
                        <Link to="/home">Home</Link>
                    </li>
                    <li class="nav-element">
                        <Link to="/browse">Browse</Link>
                    </li>
                    <li class="nav-element">
                        <Link to="/contact">Contact</Link>
                    </li>
                    {user && user.IsAdmin == 1 && (
                        <li class="nav-element">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </li>
                    )}
                    {!user && (
                        <li class="nav-element nav-right nav-last-element">
                            <Link to="/register">Register</Link>
                        </li>
                    )}
                    {!user && (
                        <li class="nav-element nav-right">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {user && (
                        <li class="nav-element nav-right nav-last-element">
                            <Link to="/welcome" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    )}
                    {user && (
                        <li class="nav-element nav-right">
                            <Link to="/profile">
                                <img
                                    src={user.Image}
                                    class="navbar-profile-img"
                                ></img>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
