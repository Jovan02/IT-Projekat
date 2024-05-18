import React, { useEffect } from "react";
import "../styles/Profile.css";
import AuthContext from "../AuthContext";
import { useContext, useState } from "react";
import axios from "axios";

const Profile = () => {
    const URL = "http://localhost:8000";
    const { user } = useContext(AuthContext);

    const [tickets, setTickets] = useState([]);

    const loadTickets = async () => {
        user["ID"] = 14;
        try {
            const response = await axios.get(
                `${URL}/api/tickets/user/${user.ID}`
            );
            setTickets(response.data);
            console.log(response.data);
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
                <img
                    class="img-profile"
                    src="images/joker.jfif"
                    alt="Profile Picture"
                />

                <p class="change-picture-text">Change profile picture</p>

                <h2 class="profile-username">{user.Username}</h2>

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
