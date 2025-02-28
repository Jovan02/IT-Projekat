import React, { useContext } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import AuthContext from "../AuthContext";

function Register() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(null);

    const { register } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const onExitModal = () => {
        setModal(null);
        navigate("/home");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(inputs);
            setModal({
                title: "Registration successful",
                message: "You have registered successfully.",
            });
            setTimeout(() => {
                setModal(null);
                navigate("/home");
            }, 1000);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <form className="register-form">
                <h2 className="register-text">Register</h2>
                <label for="email">Email</label>
                <input
                    className="input-field"
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={handleChange}
                />
                <label for="username">Username</label>
                <input
                    className="input-field"
                    type="text"
                    name="username"
                    id="username"
                    required
                    onChange={handleChange}
                />
                <label for="password">Password</label>
                <input
                    className="input-field"
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={handleChange}
                />
                <button
                    className="register-button"
                    type="submit"
                    onClick={handleRegister}
                >
                    Register
                </button>
                {error && <p className="error-message">{error}</p>}
                <p className="login-here-text">
                    Already have an acount?{" "}
                    <Link className="login-link" to="/login">
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
