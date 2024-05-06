import React from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
function Register() {
    return (
        <div class="main">
            <div class="title">
                <h1>CINEMAXX</h1>
            </div>

            <div class="main-container">
                <form class="register-form">
                    <h2 class="register-text">Register</h2>
                    <label for="email">Email</label>
                    <input
                        class="input-field"
                        type="email"
                        name="email"
                        required
                    />
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
                    <button class="register-button" type="submit">
                        Register
                    </button>
                    <p class="login-here-text">
                        Already have an acount?{" "}
                        <Link class="login-link" to="/login">
                            Log in here.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
