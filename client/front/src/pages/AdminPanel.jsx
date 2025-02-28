import React, { useEffect, useRef } from "react";
import "../styles/AdminPanel.css";
import { useState } from "react";
import ManageUsers from "../components/ManageUsers";
import AddMovie from "../components/AddMovie";
import AddScreening from "../components/AddScreening";
import ManageMovies from "../components/ManageMovies";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(1);
    const [modal, setModal] = useState(null);
    const [response, setResponse] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");
    const [movieToDelete, setMovieToDelete] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [movieData, setMovieData] = useState({});

    const handleChooseTab = (e) => {
        if (e.target.innerHTML === "Manage Users") {
            setSelectedTab(1);
        } else if (e.target.innerHTML === "Manage Movies") {
            setSelectedTab(2);
        } else if (e.target.innerHTML === "Add screening") {
            setSelectedTab(3);
        }
    };

    const handleDeleteUser = (username) => {
        setModal({
            title: "Delete user",
            message: `Are you sure you want to delete ${username}?`,
            type: "Delete",
        });
        setUserToDelete(username);
    };

    const handleDeleteMovie = (movieId) => {
        setModal({
            title: "Delete movie",
            message: `Are you sure you want to delete the movie?`,
            type: "Delete",
        });
        setMovieToDelete(movieId);
    };

    const handleModalClose = (resp) => {
        setResponse(resp);
        setModal(null);
        navigate("/admin-panel");
    };

    const handleAddMovieClick = () => {
        setIsEdit(false);
        setMovieData({
            Name: "",
            Description: "",
            Duration: "",
            Genres: [],
        });
        setIsOpen(true);
    };

    const onExit = () => {
        setModal(null);
        navigate("/admin-panel");
    };

    useEffect(() => {}, [movieData]);

    return (
        <>
            <div className="choice-buttons">
                <button
                    className={
                        "button " +
                        (selectedTab == 1 ? "choice-buttons--selected" : "")
                    }
                    onClick={handleChooseTab}
                >
                    Manage Users
                </button>
                <button
                    className={
                        "button " +
                        (selectedTab == 2 ? "choice-buttons--selected" : "")
                    }
                    onClick={handleChooseTab}
                >
                    Manage Movies
                </button>
                <button
                    className={
                        "button " +
                        (selectedTab == 3 ? "choice-buttons--selected" : "")
                    }
                    onClick={handleChooseTab}
                >
                    Add screening
                </button>
            </div>

            {selectedTab == 1 && (
                <ManageUsers
                    setModal={setModal}
                    response={response}
                    setResponse={setResponse}
                    handleDeleteUser={handleDeleteUser}
                    userToDelete={userToDelete}
                    setUserToDelete={setUserToDelete}
                />
            )}

            {selectedTab == 2 && (
                <>
                    <button className="button" onClick={handleAddMovieClick}>
                        Add New Movie
                    </button>
                    <AddMovie
                        setModal={setModal}
                        movieData={movieData}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                    <ManageMovies
                        setModal={setModal}
                        setMovieData={setMovieData}
                        setIsEdit={setIsEdit}
                        handleDeleteClick={handleDeleteMovie}
                        response={response}
                        setResponse={setResponse}
                        movieToDelete={movieToDelete}
                        setMovieToDelete={setMovieToDelete}
                        setIsOpen={setIsOpen}
                    />
                </>
            )}

            {selectedTab == 3 && <AddScreening setModal={setModal} />}

            {modal && (
                <Modal
                    title={modal.title}
                    message={modal.message}
                    onExit={onExit}
                    onClose={handleModalClose}
                    isDelete={modal.type === "Delete"}
                />
            )}
        </>
    );
};

export default AdminPanel;
