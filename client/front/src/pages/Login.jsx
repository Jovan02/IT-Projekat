import React from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div class="main">
            <div class="title">
                <h1>CINEMAXX</h1>
            </div>

            <div class="main-container">
                <form class="login-form">
                    <h2 class="login-text">Login</h2>
                    <label for="username">Username</label>
                    <input
                        class="input-field"
                        type="text"
                        name="username"
                        required
                    />
                    <label for="password">Password</label>
                    <input
                        class="input-field"
                        type="password"
                        name="password"
                        required
                    />
                    <button class="login-button" type="submit">
                        Login
                    </button>
                    <p class="register-here-text">
                        Don't have an account yet?
                        <Link class="register-link" to="/register">
                            Register here.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
