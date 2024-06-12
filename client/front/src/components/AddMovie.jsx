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
    // isEdit - ako je true, onda se prikazuju podaci o filmu koji se edituje i klik na dugme Add se vrsi update, a ne add
    const [genres, setGenres] = useState([]);
    const [file, setFile] = useState(null);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [movieDuration, setMovieDuration] = useState("");
    const [movieGenres, setMovieGenres] = useState([]);
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
            setSelectedGenres(response.data.map((genre) => genre.GenreName));
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
                };
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
                };
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
                setFile(null);
            }
        }
        setIsEdit(false);
        setMovieName("");
        setMovieDescription("");
        setMovieDuration("");
        setMovieGenres([]);
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

    const handleGenreCheckbox = (e) => {
        if (e.target.checked) {
            setMovieGenres([...movieGenres, e.target.name]);
        } else {
            setMovieGenres(
                movieGenres.filter((genre) => genre !== e.target.name)
            );
        }
    };

    useEffect(() => {
        loadGenres();
    }, []);

    useEffect(() => {
        setMovieName(movieData.Name);
        setMovieDescription(movieData.Description);
        setMovieDuration(movieData.Duration);
        console.log("muvi dejta: ", movieData);
        setMovieGenres(genres); // UNDEFINED!!!
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
    }, [selectedGenres]);

    return (
        <>
            {isOpen && (
                <div class="container add-movie-container hidden">
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
                        />
                        {/* <div class="genre-checkbox-container">
                    {genres.map((genre) => (
                        <label class="checkbox-box">
                            {genre.Name}
                            <input
                                type="checkbox"
                                name={genre.Name}
                                onChange={handleGenreCheckbox}
                                checked={movieGenres.includes(genre.Name)}
                            />
                            <span class="checkmark"></span>
                        </label>
                    ))}
                </div> */}
                        <label for="duration">Duration</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            required
                            onChange={handleDurationChange}
                            value={movieDuration}
                        />
                        <label for="description">Description</label>
                        <textarea
                            class="description"
                            id="description"
                            name="description"
                            contenteditable=""
                            required
                            onChange={handleDescriptionChange}
                            value={movieDescription}
                        ></textarea>
                    </form>

                    <button class="button-movie" onClick={handleAddMovie}>
                        Add
                    </button>
                </div>
            )}
            {isOpen && (
                <div class="overlay" onClick={(e) => setIsOpen(false)}></div>
            )}
        </>
    );
};

export default AddMovie;
