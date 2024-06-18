import React from "react";
import "../styles/AdminPanel.css";
import { useState, useEffect } from "react";
import PaginationNumbers from "./PaginationNumbers";
import axios from "axios";

const ManageUsers = ({
    handleDeleteUser,
    response,
    setResponse,
    userToDelete,
    setUserToDelete,
}) => {
    const [users, setUsers] = useState([]);
    const [userPageId, setUserPageId] = useState(1);
    const [userPages, setUserPages] = useState(1);

    const loadUsers = async () => {
        try {
            const response = await axios.get(`/api/api/users/${userPageId}`);
            setUsers(response.data.result);
            setUserPages(response.data.pages);
            console.log("respons: ", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async () => {
        if (userToDelete === "") return;
        try {
            await axios.delete(`/api/api/users/${userToDelete}`);
            console.log(userToDelete);
            loadUsers();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (response) {
            deleteUser(response);
            setResponse(false);
            setUserToDelete("");
        }
    }, [response]);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        loadUsers();
    }, [userPageId]);

    return (
        <div className="container manage-users-main-container">
            <div className="container manage-users-container">
                {users.map((user) => (
                    <div className="manage-user-card">
                        <img src={user.Image} className="user-image" />
                        <p className="username">{user.Username}</p>
                        <button
                            className="button-delete"
                            onClick={(e) => {
                                handleDeleteUser(user.Username);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div className="manage-users-pages">
                <PaginationNumbers
                    selectedPageId={userPageId}
                    numberOfPages={userPages}
                    setPageId={setUserPageId}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
