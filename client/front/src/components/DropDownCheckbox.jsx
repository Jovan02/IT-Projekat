import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/DropDownCheckbox.css";

const DropDownCheckbox = ({ filterGenres, setFilterGenres, darkMode }) => {
    const [genres, setGenres] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const loadData = async () => {
        try {
            const response = await axios.get(`/api/api/genres`);
            setGenres(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleExpandGenres = () => {
        console.log(expanded);
        setExpanded(!expanded);
    };

    const handleGenderChoose = (e) => {
        e.preventDefault();
        const genre = e.target.value;
        if (filterGenres.includes(genre)) {
            setFilterGenres((prev) => prev.filter((item) => item !== genre));
        } else {
            setFilterGenres((prev) => [...prev, genre]);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // console.log(filterGenres);
    }, [filterGenres]);

    return (
        <div class="dropdows-genres">
            <button
                class={
                    darkMode
                        ? "genre-filter-button--dark"
                        : "genre-filter-button"
                }
                onClick={handleExpandGenres}
            >
                Genres
            </button>
            {expanded && (
                <select name="genres" class="genres" multiple>
                    {genres.map((genre) => (
                        <option
                            class={
                                "genre-item " +
                                (filterGenres.includes(genre.Name)
                                    ? "selected-genre"
                                    : "")
                            }
                            value={genre.Name}
                            onClick={handleGenderChoose}
                        >
                            {genre.Name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default DropDownCheckbox;
