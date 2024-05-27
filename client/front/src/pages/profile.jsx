import React, { useEffect } from "react";
import "../styles/Profile.css";
import AuthContext from "../AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

const Profile = () => {
    const URL = "http://localhost:8000";
    const { user, setUser } = useContext(AuthContext);

    const [tickets, setTickets] = useState([]);
    const [image, setImage] = useState("images/joker.jfif");

    const loadTickets = async () => {
        try {
            const response = await axios.get(`${URL}/api/tickets/user`);
            setTickets(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeImage = async () => {
        const data = new FormData();
        data.append("file", image);
        try {
            await axios.post(`${URL}/api/images`, data);
            console.log(image.name);
            await axios.put(`${URL}/api/users`, {
                image: `${URL}/public/images/${image.name}`,
            });
            setUser({
                ...user,
                Image: `${URL}/public/images/${image.name}`,
            });
            console.log({
                ...user,
                Image: `${URL}/public/images/${image.name}`,
            });
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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

                <input
                    type="file"
                    id="change-picture"
                    name="change-picture"
                    required
                    multiple={false}
                    class="change-picture-text"
                    onChange={handleImageChange}
                />
                <p class="change-picture-button" onClick={handleChangeImage}>
                    Change Picture
                </p>

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
