import React, { useEffect, useState } from "react";
import "../styles/ManageMovies.css";
import axios from "axios";

const ManageMovies = ({ setModal, setMovieData, setIsEdit }) => {
    const [movies, setMovies] = useState([]);
    const [movieToDelete, setMovieToDelete] = useState("");
    const [response, setResponse] = useState(false);

    const loadMovies = async () => {
        try {
            const response = await axios.get("/api/api/movies");
            setMovies(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (movieId) => {
        console.log("kliknut");
        const movie = movies.find((movie) => movie.ID === movieId);
        setMovieData(movie);
        setIsEdit(true);
    };

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <div className="manage-movies-container">
            <div className="movies-list">
                {movies ? (
                    movies.map((movie) => (
                        <div className="movie" id={movie.ID}>
                            <img
                                class="card-img"
                                src={movie.Image}
                                alt="movie"
                            />
                            <div class="card-content">
                                <h3 class="card-title">{movie.Name}</h3>
                                <button
                                    class="card-button card-button--edit"
                                    onClick={(e) => handleEditClick(movie.ID)}
                                >
                                    Edit
                                </button>
                                <button class="card-button card-button--delete">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div class="loading-text">Loading...</div>
                )}
            </div>
        </div>
    );
};

export default ManageMovies;
