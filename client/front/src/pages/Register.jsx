import React from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

function Register() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(null);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const onExitModal = () => {
        setModal(null);
        navigate("/login");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/api/auth/register", inputs);
            setModal({
                title: "Registration successful",
                message: response.data.message,
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
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
                {error && <p class="error-message">{error}</p>}
                <p class="login-here-text">
                    Already have an acount?{" "}
                    <Link class="login-link" to="/login">
                        Log in here.
                    </Link>
                </p>
            </form>

            {modal && (
                <Modal
                    title={modal.title}
                    message={modal.message}
                    onExit={onExitModal}
                />
            )}
        </>
    );
}

export default Register;
