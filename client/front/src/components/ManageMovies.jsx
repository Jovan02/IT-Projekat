import React, { useEffect, useState } from "react";
import "../styles/ManageMovies.css";
import axios from "axios";
import PaginationNumbers from "./PaginationNumbers";
import SearchBar from "./SearchBar";

const ManageMovies = ({
    setMovieData,
    setIsEdit,
    response,
    setResponse,
    movieToDelete,
    setMovieToDelete,
    handleDeleteClick,
    setIsOpen,
}) => {
    const [movies, setMovies] = useState([]);
    const [moviePageId, setMoviePageId] = useState(1);
    const [moviePages, setMoviePages] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [error, setError] = useState("");

    const loadMovies = async () => {
        try {
            const response = await axios.get(
                `/api/api/movies/${moviePageId}?search=${filterText}`
            );
            setMovies(response.data.result);
            setMoviePages(response.data.pages);
            console.log(response.data);
            setError("");
        } catch (error) {
            console.error(error);
            if (error.response.status === 404) {
                setMovies([]);
                setMoviePages(0);
                setError(error.response.data.message);
            }
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
        setIsOpen(true);
    };

    const handleSearchClick = (e) => {
        loadMovies();
    };

    useEffect(() => {
        loadMovies();
    }, []);

    useEffect(() => {
        setMovies(null);
        loadMovies();
    }, [moviePageId]);

    useEffect(() => {
        if (response) {
            deleteMovie(response);
            setResponse(false);
            setMovieToDelete("");
        }
    }, [response]);

    return (
        <div className="manage-movies-container">
            <SearchBar
                type="movies"
                setFilterText={setFilterText}
                onClickSearch={handleSearchClick}
            />
            {error ? (
                <div className="loading-text">{error}</div>
            ) : (
                <div className="movies-list">
                    {movies ? (
                        movies.map((movie) => (
                            <div className="movie" id={movie.ID}>
                                <img
                                    className="card-img"
                                    src={movie.Image}
                                    alt="movie"
                                />
                                <div className="card-content">
                                    <h3 className="card-title">{movie.Name}</h3>
                                    <button
                                        className="card-button card-button--edit"
                                        onClick={(e) =>
                                            handleEditClick(movie.ID)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="card-button card-button--delete"
                                        onClick={(e) =>
                                            handleDeleteClick(movie.ID)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="loading-text">Loading...</div>
                    )}
                </div>
            )}
            <div className="movies-pages">
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
