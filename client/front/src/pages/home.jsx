import React, { useEffect } from "react";
import "../styles/Home.css";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useState } from "react";
import PaginationNumbers from "../components/PaginationNumbers";
import SearchBar from "../components/SearchBar";

const Home = () => {
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
            console.log(response.data);
            setMovies(response.data.result);
            setMoviePages(response.data.pages);
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

    return (
        <div className="home-container">
            <SearchBar
                type="movies"
                setFilterText={setFilterText}
                onClickSearch={handleSearchClick}
            />

            {error ? (
                <div className="loading-text">{error}</div>
            ) : (
                <div className="card-container">
                    {movies ? (
                        movies.map((movie) => (
                            <MovieCard
                                imagePath={movie.Image}
                                title={movie.Name}
                                id={movie.ID}
                            />
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
export default Home;
