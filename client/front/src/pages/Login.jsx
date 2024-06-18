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
        <>
            <form className="login-form">
                <h2 className="login-text">Login</h2>
                <label for="username">Username</label>
                <input
                    className="input-field"
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    required
                />
                <label for="password">Password</label>
                <input
                    className="input-field"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                />
                <button
                    className="login-button"
                    type="submit"
                    onClick={handleLogin}
                >
                    Login
                </button>
                {error && <p className="error-message">{error}</p>}
                <p className="register-here-text">
                    Don't have an account yet?{" "}
                    <Link className="register-link" to="/register">
                        Register here.
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Login;
