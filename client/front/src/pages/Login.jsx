import React from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { useContext } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/home");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

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
                        id="username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        required
                    />
                    <label for="password">Password</label>
                    <input
                        class="input-field"
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                    <button
                        class="login-button"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    {error && <p class="error-message">{error}</p>}
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
