import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../styles/DropDownCheckbox.css";

const DropDownCheckbox = ({
    filterGenres,
    setFilterGenres,
    darkMode,
    isEdit,
}) => {
    const [genres, setGenres] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const dropDownRef = useRef(null);

    const loadData = async () => {
        try {
            const response = await axios.get(`/api/api/genres`);
            setGenres(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleExpandGenres = (e) => {
        e.preventDefault();
        console.log(expanded);
        setExpanded(!expanded);
    };

    const handleGenderChoose = (e) => {
        e.preventDefault();
        const genre = e.target.value;
        if (filterGenres.includes(genre)) {
            setFilterGenres(filterGenres.filter((item) => item !== genre));
        } else {
            setFilterGenres([...filterGenres, genre]);
        }
    };

    useEffect(() => {
        loadData();
        document.addEventListener("click", (e) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(e.target)
            ) {
                setExpanded(false);
            }
        });
        if (!isEdit) {
            setFilterGenres([]);
        }
    }, []);

    useEffect(() => {
        // console.log(filterGenres);
    }, [filterGenres]);

    return (
        <div ref={dropDownRef} className="dropdows-genres">
            <button
                className={
                    darkMode
                        ? "genre-filter-button--dark"
                        : "genre-filter-button"
                }
                onClick={handleExpandGenres}
            >
                Genres
            </button>
            {expanded && (
                <select name="genres" className="genres" multiple>
                    {genres.map((genre) => (
                        <option
                            className={
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
