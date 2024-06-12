import React from "react";
import { useState, useEffect, useRef } from "react";
import "../styles/AdminPanel.css";
import axios from "axios";
import SearchBar from "../components/SearchBar";

const AddScreening = ({ setModal }) => {
    const movieRef = useRef();
    const hallRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();

    const handleAddProjection = async () => {
        const movie = movieRef.current.dataset.selectedid;
        const hall = hallRef.current.dataset.selectedid;
        const date = dateRef.current.value;
        const time = timeRef.current.value;

        const projectionData = {
            movieId: movie,
            hallId: hall,
            date: date,
            time: time,
        };
        if (!movie || !hall || !date || !time) {
            setModal({
                title: "Error",
                message: "All fields are required",
            });
            return;
        }

        try {
            const response = await axios.post(
                `/api/api/screenings`,
                projectionData
            );
            console.log(response);
            setModal({
                title: "Add screening",
                message: `Screening has been successfully added`,
            });
        } catch (error) {
            console.log(error);
            setModal({
                title: "Error",
                message: `${error.response.data.message}`,
            });
        }
    };
    return (
        <div class="container add-screening">
            <form>
                <label for="movie">Movie</label>
                <SearchBar
                    type="movies"
                    reference={(e) => (movieRef.current = e)}
                />
                <label for="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    ref={(e) => (dateRef.current = e)}
                />
                <label for="time">Time</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    ref={(e) => (timeRef.current = e)}
                />
                <label for="hall">Hall</label>
                <SearchBar
                    type="halls"
                    reference={(e) => (hallRef.current = e)}
                />
            </form>

            <button class="button-movie" onClick={handleAddProjection}>
                Add
            </button>
        </div>
    );
};

export default AddScreening;
