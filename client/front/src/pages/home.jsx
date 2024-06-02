import React, { useEffect } from "react";
import "../styles/Home.css";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useState } from "react";
import PaginationNumbers from "../components/PaginationNumbers";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [moviePageId, setMoviePageId] = useState(1);
    const [moviePages, setMoviePages] = useState(1);

    const loadMovies = async () => {
        try {
            const response = await axios.get(`/api/api/movies/${moviePageId}`);
            console.log(response.data);
            setMovies(response.data.result);
            setMoviePages(response.data.pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    useEffect(() => {
        setMovies(null);
        loadMovies();
    }, [moviePageId]);

    return (
        <div class="home-container">
            <div class="card-container">
                {movies ? (
                    movies.map((movie) => (
                        <MovieCard
                            imagePath={movie.Image}
                            title={movie.Name}
                            id={movie.ID}
                        />
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
export default Home;
