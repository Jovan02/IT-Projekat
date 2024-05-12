import React from "react";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
    return (
        <div class="main">
            <div class="title">
                <h1>CINEMAXX</h1>
            </div>

            <div class="main-container">
                <div class="choice-buttons">
                    <button class="button">Manage Users</button>
                    <button class="button">Add movie</button>
                    <button class="button">Add projection</button>
                </div>

                <div class="manage-users-container">
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                    <div class="manage-user-card">
                        <p class="username">Username</p>
                        <button class="button-delete">Delete</button>
                    </div>
                </div>

                <div class="add-movie-container">
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

                <div class="add-screening">
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
