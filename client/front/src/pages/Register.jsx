import React from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/register",
                inputs
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form class="register-form">
                <h2 class="register-text">Register</h2>
                <label for="email">Email</label>
                <input
                    class="input-field"
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={handleChange}
                />
                <label for="username">Username</label>
                <input
                    class="input-field"
                    type="text"
                    name="username"
                    id="username"
                    required
                    onChange={handleChange}
                />
                <label for="password">Password</label>
                <input
                    class="input-field"
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={handleChange}
                />
                <button
                    class="register-button"
                    type="submit"
                    onClick={handleRegister}
                >
                    Register
                </button>
                <p class="login-here-text">
                    Already have an acount?{" "}
                    <Link class="login-link" to="/login">
                        Log in here.
                    </Link>
                </p>
            </form>
        </>
    );
}

export default Register;
