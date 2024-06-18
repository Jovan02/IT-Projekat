import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Browse.css";
import DropDownCheckbox from "../components/DropDownCheckbox";
import axios from "axios";

const Browse = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [allScreenings, setAllScreenings] = useState([]);
    const [screenings, setScreenings] = useState([]);
    const [filterGenres, setFilterGenres] = useState([]);
    const [dateFrom, setDateFrom] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [dateTo, setDateTo] = useState(
        new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
    );

    const handleDateChange = (e) => {
        const chosenDate = new Date(e.target.value);
        if (e.target.placeholder === "From") {
            if (chosenDate < new Date()) {
                e.target.value = new Date().toISOString().split("T")[0];
            }
            setDateFrom(e.target.value);
        } else {
            if (chosenDate < new Date(dateFrom)) {
                e.target.value = dateFrom;
            }
            setDateTo(e.target.value);
        }
    };

    const handleFilterClick = (e) => {
        loadData();
    };

    const handleScreeningClick = (e, id) => {
        navigate(`/ticket/${id}`);
    };

    const handleMovieClick = (e, id) => {
        navigate(`/movie/${id}`);
    };

    const loadData = async () => {
        try {
            const response = await axios.get(
                `/api/api/screenings/movies?genres=${filterGenres.toString()}&dateFrom=${dateFrom}&dateTo=${dateTo}`
            );
            let fixedScreenings = response.data.map((screening) => {
                return {
                    ID: screening.ID,
                    Date: new Date(
                        new Date(screening.Date).getTime() + 24 * 60 * 60 * 1000
                    )
                        .toISOString()
                        .split("T")[0],
                    Time: screening.Time,
                    Duration: screening.Duration,
                    MovieID: screening.MovieID,
                    Name: screening.Name,
                    Image: screening.Image,
                    HallID: screening.HallID,
                };
            });

            setAllScreenings(fixedScreenings);
            console.log(fixedScreenings);
        } catch (error) {
            if (error.response.status === 404) {
                setAllScreenings([]);
            }
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        let tempMovies = [];
        allScreenings.forEach((element) => {
            if (
                tempMovies.filter((movie) => movie.id === element.MovieID)
                    .length === 0
            ) {
                tempMovies.push({
                    id: element.MovieID,
                    name: element.Name,
                    image: element.Image,
                    duration: element.Duration,
                });
            }
        });
        setMovies(tempMovies);
        console.log("MUVIZ", tempMovies);
    }, [filterGenres, allScreenings]);

    return (
        <div class="browse-container">
            <div class="filter-container">
                <DropDownCheckbox
                    filterGenres={filterGenres}
                    setFilterGenres={setFilterGenres}
                />
                <input
                    type="date"
                    class="date-filter date-from-filter"
                    placeholder="From"
                    value={dateFrom}
                    onChange={handleDateChange}
                />
                <input
                    type="date"
                    class="date-filter date-to-filter"
                    placeholder="To"
                    value={dateTo}
                    onChange={handleDateChange}
                />
                <button class="filter-button" onClick={handleFilterClick}>
                    Filter
                </button>
            </div>
            <div class="browse-movies">
                {movies.map((movie) => (
                    <div class="browse-movie">
                        <img
                            src={movie.image}
                            alt="movie"
                            class="browse-movie-img"
                            onClick={(e) => handleMovieClick(e, movie.id)}
                        />
                        <div class="browse-movie-info">
                            <h3>{movie.name}</h3>
                            {/* <p>Genres: Thriller, Drama, Mystery</p> */}
                            <p>Duration: {movie.duration}</p>
                        </div>
                        <div class="browse-movie-screenings">
                            {allScreenings
                                .filter(
                                    (screening) =>
                                        movie.id === screening.MovieID
                                )
                                .map((screening) => (
                                    <div
                                        class="browse-movie-screening"
                                        onClick={(e) =>
                                            handleScreeningClick(
                                                e,
                                                screening.ID
                                            )
                                        }
                                    >
                                        <p>{screening.Date.split("T")[0]}</p>
                                        <p>{screening.Time.slice(0, 5)}</p>
                                        <p>Hall: {screening.HallID}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Browse;
