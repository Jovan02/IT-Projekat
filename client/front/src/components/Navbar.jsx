import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);

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

    const handleMenuClick = () => {
        let dropdownList = document.querySelector(".dropdown-list");
        if (visible) {
            dropdownList.style.display = "flex";
        } else {
            dropdownList.style.display = "none";
        }
        setVisible(!visible);
    };

    return (
        <header>
            <nav className="desktop-navbar">
                <ul className="nav-elements">
                    <li className="nav-element">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="nav-element">
                        <Link to="/browse">Browse</Link>
                    </li>

                    {user && user.IsAdmin == 1 && (
                        <li className="nav-element">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </li>
                    )}
                    {!user && (
                        <li className="nav-element nav-right nav-last-element">
                            <Link to="/register">Register</Link>
                        </li>
                    )}
                    {!user && (
                        <li className="nav-element nav-right">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-element nav-right nav-last-element">
                            <Link to="/welcome" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-element nav-right">
                            <Link to="/profile">
                                <img
                                    src={user.Image}
                                    className="navbar-profile-img"
                                ></img>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            <nav className="mobile-navbar">
                <ul className="nav-elements">
                    <div onClick={handleMenuClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="burger-icon"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </div>

                    {user && (
                        <li className="nav-element nav-right nav-last-element">
                            <Link to="/welcome" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-element nav-right">
                            <Link to="/profile">
                                <img
                                    src={user.Image}
                                    className="navbar-profile-img"
                                ></img>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            <nav>
                <ul className="dropdown-list">
                    <li className="nav-element">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="nav-element">
                        <Link to="/browse">Browse</Link>
                    </li>

                    {user && user.IsAdmin == 1 && (
                        <li className="nav-element">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
