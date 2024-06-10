import React, { useEffect, useState } from "react";
import "../styles/ManageMovies.css";
import axios from "axios";
import PaginationNumbers from "./PaginationNumbers";

const ManageMovies = ({
    setMovieData,
    setIsEdit,
    response,
    setResponse,
    movieToDelete,
    setMovieToDelete,
    handleDeleteClick,
}) => {
    const [movies, setMovies] = useState([]);
    const [moviePageId, setMoviePageId] = useState(1);
    const [moviePages, setMoviePages] = useState(1);

    const loadMovies = async () => {
        try {
            const response = await axios.get(`/api/api/movies/${moviePageId}`);
            setMovies(response.data.result);
            setMoviePages(response.data.pages);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteMovie = async () => {
        if (movieToDelete === "") return;
        try {
            await axios.delete(`/api/api/movies/${movieToDelete}`);
            loadMovies();
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

    useEffect(() => {
        setMovies(null);
        loadMovies();
    }, [moviePageId]);

    useEffect(() => {
        console.log("AGSAGAGASGSFSA");
        if (response) {
            deleteMovie(response);
            setResponse(false);
            setMovieToDelete("");
        }
    }, [response]);

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
                                <button
                                    class="card-button card-button--delete"
                                    onClick={(e) => handleDeleteClick(movie.ID)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div class="loading-text">Loading...</div>
                )}
            </div>
            <div class="movies-pages">
                <PaginationNumbers
                    selectedPageId={moviePageId}
                    numberOfPages={moviePages}
                    setPageId={setMoviePageId}
                />
            </div>
        </div>
    );
};

export default ManageMovies;
