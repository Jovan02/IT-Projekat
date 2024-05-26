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
    const URL = "http://localhost:8000";

    const [users, setUsers] = useState([]);
    const [userPageId, setUserPageId] = useState(1);
    const [userPages, setUserPages] = useState(1);

    const loadUsers = async () => {
        try {
            console.log("UISAO ODJE U LOAD USERS MATER TI JEBEM U PICKU");
            const response = await axios.get(`${URL}/api/users/${userPageId}`);
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
            await axios.delete(`${URL}/api/users/${userToDelete}`);
            console.log(userToDelete);
            loadUsers();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("WOWOWMMMPP WOMMPMP AGSAGAGASGSFSA");
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
        <div class="container manage-users-main-container">
            <div class="container manage-users-container">
                {users.map((user) => (
                    <div class="manage-user-card">
                        <p class="username">{user.Username}</p>
                        <button
                            class="button-delete"
                            onClick={(e) => {
                                handleDeleteUser(user.Username);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div class="manage-users-pages">
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
