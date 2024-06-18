import React, { useEffect } from "react";
import "../styles/Profile.css";
import AuthContext from "../AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import PaginationNumbers from "../components/PaginationNumbers";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [image, setImage] = useState("images/profile-placeholder.jfif");
    const [toggleEdit, setToggleEdit] = useState(false);
    const [email, setEmail] = useState(user.Email);
    const [selectedPageId, setSelectedPageId] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);

    const loadTickets = async () => {
        try {
            const response = await axios.get(
                `/api/api/tickets/user/${selectedPageId}`
            );
            setTickets(response.data.result);
            setNumberOfPages(response.data.pages);
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

    const handleTicketClick = (e, id) => {
        navigate(`/movie/${id}`);
    };
    useEffect(() => {
        loadTickets();
    }, []);

    useEffect(() => {
        loadTickets();
    }, [selectedPageId]);

    return (
        <>
            <div className="profile-container">
                <h2 className="profile-username">{user.Username}</h2>

                <img
                    className="img-profile"
                    src={user.Image}
                    alt="Profile Picture"
                />

                <button
                    className="change-picture-button"
                    onClick={handleToggleEdit}
                >
                    Edit profile
                </button>

                {toggleEdit && (
                    <>
                        <div className="edit-container">
                            <input
                                type="file"
                                id="change-picture"
                                name="change-picture"
                                required
                                multiple={false}
                                className="change-picture-text"
                                onChange={handleImageChange}
                            />
                            <button
                                className="change-picture-button"
                                onClick={handleChangeImage}
                            >
                                Change Picture
                            </button>
                        </div>
                        <form className="edit-container">
                            <input
                                type="email"
                                onChange={handleChangeEmail}
                                placeholder={user.Email}
                            />
                            <button
                                className="change-picture-button"
                                onClick={handleEditEmail}
                            >
                                Change Email
                            </button>
                        </form>
                    </>
                )}

                <h2 className="profile-ticket-text">My tickets</h2>

                <div className="profile-ticket-container">
                    {tickets.map((ticket) => (
                        <div
                            className="profile-ticket"
                            onClick={(e) =>
                                handleTicketClick(e, ticket.MovieID)
                            }
                        >
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
                <div className="ticket-pagination-numbers">
                    <PaginationNumbers
                        selectedPageId={selectedPageId}
                        numberOfPages={numberOfPages}
                        setPageId={setSelectedPageId}
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
