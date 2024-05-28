import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const AddMovie = ({ setModal }) => {
    const [genres, setGenres] = useState([]);
    const [file, setFile] = useState(null);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [movieDuration, setMovieDuration] = useState("");
    const [movieGenres, setMovieGenres] = useState([]);

    const loadGenres = async () => {
        try {
            const response = await axios.get(`/api/api/genres`);
            setGenres(response.data);
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
                message: `${error.response.data}`,
            });
        }
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

    return (
        <div class="container add-movie-container">
            <form>
                <label for="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={handleTitleChange}
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
                <div class="genre-checkbox-container">
                    {genres.map((genre) => (
                        <label class="checkbox-box">
                            {genre.Name}
                            <input
                                type="checkbox"
                                name={genre.Name}
                                onChange={handleGenreCheckbox}
                            />
                            <span class="checkmark"></span>
                        </label>
                    ))}
                </div>
                <label for="duration">Duration</label>
                <input
                    type="text"
                    id="duration"
                    name="duration"
                    required
                    onChange={handleDurationChange}
                />
                <label for="description">Description</label>
                <textarea
                    class="description"
                    id="description"
                    name="description"
                    contenteditable=""
                    required
                    onChange={handleDescriptionChange}
                ></textarea>
            </form>

            <button class="button-movie" onClick={handleAddMovie}>
                Add
            </button>
        </div>
    );
};

export default AddMovie;
