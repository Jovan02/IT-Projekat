import React from "react";
import "../styles/AdminPanel.css";
import axios from "axios";
import { useState } from "react";

const AdminPanel = () => {
    const URL = "http://localhost:8000";

    const handleChooseTab = (e) => {
        const buttons = document.querySelectorAll(".button");
        const containers = document.querySelectorAll(".container");

        buttons.forEach((button) => {
            button.classList.remove("active");
        });

        containers.forEach((container) => {
            container.style.display = "none";
        });

        e.target.classList.add("active");

        if (e.target.innerHTML === "Manage Users") {
            document.querySelector(".manage-users-container").style.display =
                "flex";
            loadUsers();
        } else if (e.target.innerHTML === "Add movie") {
            document.querySelector(".add-movie-container").style.display =
                "flex";
        } else if (e.target.innerHTML === "Add projection") {
            document.querySelector(".add-screening").style.display = "flex";
        }
    };

    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const response = await axios.get(`${URL}/api/users`);
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${URL}/api/users/${id}`);
            console.log(id);
            loadUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div class="main">
            <div class="title">
                <h1>CINEMAXX</h1>
            </div>

            <div class="main-container">
                <div class="choice-buttons">
                    <button class="button" onClick={handleChooseTab}>
                        Manage Users
                    </button>
                    <button class="button" onClick={handleChooseTab}>
                        Add movie
                    </button>
                    <button class="button" onClick={handleChooseTab}>
                        Add projection
                    </button>
                </div>

                <div class="container manage-users-container">
                    {users.map((user) => (
                        <div class="manage-user-card">
                            <p class="username">{user.Username}</p>
                            <button
                                class="button-delete"
                                onClick={(e) => {
                                    handleDeleteUser(user.ID);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <div class="container add-movie-container">
                    <form>
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" required />
                        <label for="image">Image</label>
                        <input type="file" id="image" name="image" required />
                        <label for="genre">Genre</label>
                        <input type="text" id="genre" name="genre" required />
                        <label for="duration">Duration</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            required
                        />
                        <label for="description">Description</label>
                        <div
                            class="description"
                            id="description"
                            name="description"
                            contenteditable=""
                        ></div>
                    </form>

                    <button class="button-movie">Add</button>
                </div>

                <div class="container add-screening">
                    <form>
                        <label for="movie">Movie</label>
                        <input type="text" id="movie" name="movie" required />
                        <label for="date">Date</label>
                        <input type="date" id="date" name="date" required />
                        <label for="time">Time</label>
                        <input type="time" id="time" name="time" required />
                        <label for="hall">Hall</label>
                        <input type="text" id="hall" name="hall" required />
                    </form>

                    <button class="button-movie">Add</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
