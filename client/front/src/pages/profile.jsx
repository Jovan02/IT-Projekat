import React, { useEffect } from "react";
import "../styles/Profile.css";
import AuthContext from "../AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

const Profile = () => {
    const URL = "http://localhost:8000";
    const { user, setUser } = useContext(AuthContext);

    const [tickets, setTickets] = useState([]);
    const [image, setImage] = useState("images/profile-placeholder.jfif");
    const [toggleEdit, setToggleEdit] = useState(false);
    const [email, setEmail] = useState(user.Email);

    const loadTickets = async () => {
        try {
            const response = await axios.get(`/api/api/tickets/user`);
            setTickets(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeImage = async () => {
        const data = new FormData();
        data.append("file", image);
        try {
            await axios.post(`/api/api/images`, data);
            console.log(image.name);
            await axios.put(`/api/api/users/image`, {
                image: `/api/public/images/${image.name}`,
            });
            setUser({
                ...user,
                Image: `/api/public/images/${image.name}`,
            });
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleToggleEdit = () => {
        setToggleEdit(!toggleEdit);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleEditEmail = async () => {
        try {
            await axios.put(`/api/api/users/email`, { email: email });
            setUser({ ...user, Email: email });
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <>
            <div class="profile-container">
                <h2 class="profile-username">{user.Username}</h2>

                <img
                    class="img-profile"
                    src={user.Image}
                    alt="Profile Picture"
                />

                <button
                    class="change-picture-button"
                    onClick={handleToggleEdit}
                >
                    Edit profile
                </button>

                {toggleEdit && (
                    <>
                        <div class="edit-container">
                            <input
                                type="file"
                                id="change-picture"
                                name="change-picture"
                                required
                                multiple={false}
                                class="change-picture-text"
                                onChange={handleImageChange}
                            />
                            <button
                                class="change-picture-button"
                                onClick={handleChangeImage}
                            >
                                Change Picture
                            </button>
                        </div>
                        <form class="edit-container">
                            <input
                                type="email"
                                onChange={handleChangeEmail}
                                placeholder={user.Email}
                            />
                            <button
                                class="change-picture-button"
                                onClick={handleEditEmail}
                            >
                                Change Email
                            </button>
                        </form>
                    </>
                )}

                <h2 class="profile-ticket-text">My tickets</h2>

                <div class="profile-ticket-container">
                    {tickets.map((ticket) => (
                        <div class="profile-ticket">
                            <p>{ticket.Name}</p>
                            <p>{new Date(ticket.Date).toDateString()}</p>
                            <p>{ticket.Time}</p>
                            <p>
                                Row: {ticket.SeatRow} Column:{" "}
                                {ticket.SeatColumn}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Profile;
