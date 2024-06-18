import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";
import DropDownCheckbox from "./DropDownCheckbox";

const AddMovie = ({
    setModal,
    movieData,
    isEdit,
    setIsEdit,
    isOpen,
    setIsOpen,
}) => {
    const [genres, setGenres] = useState([]);
    const [file, setFile] = useState(null);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [movieDuration, setMovieDuration] = useState("");
    const [movieGenres, setMovieGenres] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    const loadGenres = async () => {
        try {
            const response = await axios.get(`/api/api/genres`);
            setGenres(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadMovieGenres = async () => {
        try {
            const response = await axios.get(`/api/api/genres/${movieData.ID}`);
            if (isEdit) {
                setSelectedGenres(
                    response.data.map((genre) => genre.GenreName)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleAddImage = async () => {
        const data = new FormData();
        data.append("file", file);
        try {
            await axios.post(`/api/api/images`, data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("abbabababbababbababb", selectedGenres);
    }, [selectedGenres]);

    const handleAddMovie = async () => {
        if (!movieName || !movieDescription || !movieDuration || !movieGenres) {
            setModal({
                title: "Error",
                message: "All fields are required",
            });
            return;
        }

        if (isEdit) {
            try {
                const movieDataToSend = {
                    name: movieName,
                    description: movieDescription,
                    duration: movieDuration,
                    genres: movieGenres,
                    trailer: movieTrailer,
                };
                console.log(movieGenres);
                const response = await axios.put(
                    `/api/api/movies/${movieData.ID}`,
                    movieDataToSend
                );
                console.log(response);
                setModal({
                    title: "Edit movie",
                    message: `${movieName} has been successfully edited`,
                });
            } catch (error) {
                console.log(error);
                setModal({
                    title: "Error",
                    message: `${error.response.data}`,
                });
            }
            setIsEdit(false);
        } else {
            try {
                await handleAddImage();
                const movieData = {
                    name: movieName,
                    image: `/api/public/images/${file.name}`,
                    description: movieDescription,
                    duration: movieDuration,
                    genres: movieGenres,
                    trailer: movieTrailer,
                };
                console.log(movieGenres);
                const response = await axios.post(`/api/api/movies`, movieData);
                console.log(response);
                setModal({
                    title: "Add movie",
                    message: `${movieData.name} has been successfully added`,
                });
            } catch (error) {
                console.log(error);
                setModal({
                    title: "Error",
                    message: `${error.response.data.message}`,
                });
                setIsEdit(false);
                setMovieName("");
                setMovieDescription("");
                setMovieDuration("");
                setMovieGenres([]);
                setMovieTrailer("");
                setFile(null);
            }
        }
        setIsEdit(false);
        setMovieName("");
        setMovieDescription("");
        setMovieDuration("");
        setMovieGenres([]);
        setMovieTrailer("");
        setFile(null);
        setIsOpen(false);
    };

    const handleTitleChange = (e) => {
        setMovieName(e.target.value);
    };

    const handleDurationChange = (e) => {
        setMovieDuration(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setMovieDescription(e.target.value);
    };

    const handleTrailerChange = (e) => {
        setMovieTrailer(e.target.value);
    };

    const handleGenreCheckbox = (e) => {
        if (e.target.checked) {
            setMovieGenres([...movieGenres, e.target.name]);
        } else {
            setMovieGenres(
                movieGenres.filter((genre) => genre !== e.target.name)
            );
        }
    };

    const handleCloseModal = (e) => {
        setIsOpen(false);
        setIsEdit(false);
    };

    useEffect(() => {
        loadGenres();
    }, []);

    useEffect(() => {
        setMovieName(movieData.Name);
        setMovieDescription(movieData.Description);
        setMovieDuration(movieData.Duration);
        console.log("muvi dejta: ", movieData);
        setMovieGenres(genres);
        setMovieTrailer(movieData.Trailer);
        loadMovieGenres();
    }, [movieData]);

    useEffect(() => {
        console.log(
            "SELEKTOVANI ZANROVI: ",
            selectedGenres,
            " ",
            selectedGenres.includes("Action")
        );
        setMovieGenres(selectedGenres);
        console.log("selektovani zanrovi: ", selectedGenres);
    }, [selectedGenres]);

    useEffect(() => {
        console.log(movieGenres);
    }, [movieGenres]);

    return (
        <>
            {isOpen && (
                <div className="container add-movie-container hidden">
                    <form>
                        <label for="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={handleTitleChange}
                            value={movieName}
                        />
                        <label for="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            required
                            multiple={false}
                            onChange={handleFileChange}
                        />
                        <label for="genre">Genre</label>
                        <DropDownCheckbox
                            filterGenres={movieGenres}
                            setFilterGenres={setMovieGenres}
                            darkMode={true}
                            isEdit={isEdit}
                        />

                        <label for="duration">Duration</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            required
                            onChange={handleDurationChange}
                            value={movieDuration}
                        />
                        <label for="trailer">Trailer</label>
                        <input
                            type="text"
                            id="trailer"
                            name="trailer"
                            required
                            onChange={handleTrailerChange}
                            value={movieTrailer}
                        />
                        <label for="description">Description</label>
                        <textarea
                            className="description"
                            id="description"
                            name="description"
                            contenteditable=""
                            required
                            onChange={handleDescriptionChange}
                            value={movieDescription}
                        ></textarea>
                    </form>

                    <button className="button-movie" onClick={handleAddMovie}>
                        Add
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="exit-icon"
                        onClick={handleCloseModal}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            )}
            {isOpen && (
                <div className="overlay" onClick={handleCloseModal}></div>
            )}
        </>
    );
};

export default AddMovie;
