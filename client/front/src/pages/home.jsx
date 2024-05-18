import React, { useEffect } from "react";
import "../styles/Home.css";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useState } from "react";

const Home = () => {
    const URL = "http://localhost:8000";

    const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
        try {
            const response = await axios.get(`${URL}/api/movies`);
            console.log(response.data);
            setMovies(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <>
            <div class="card-container">
                {movies.map((movie) => (
                    <MovieCard
                        imagePath={movie.Image}
                        title={movie.Name}
                        id={movie.ID}
                    />
                ))}
            </div>
        </>
    );
};
export default Home;
