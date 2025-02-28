import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ imagePath, title, id }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="card" key={id} onClick={handleCardClick}>
            <img className="card-img" src={imagePath} alt="movie" />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
