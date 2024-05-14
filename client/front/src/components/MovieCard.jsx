import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ imagePath, title, id }) => {
    const URL = "http://localhost:8000";

    const navigate = useNavigate();

    const handleCardClick = (e) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div class="card" key={id} onClick={handleCardClick}>
            <img src={imagePath} alt="movie" />
            <div class="card-content">
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
