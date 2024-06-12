import React, { useEffect } from "react";
import "../styles/SingleMovie.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useRef } from "react";
import PaginationNumbers from "../components/PaginationNumbers";
import ReviewStars from "../components/ReviewStars";

const SingleMovie = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [isStarClicked, setIsStarClicked] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [screenings, setScreenings] = useState([]);
    const [userReview, setUserReview] = useState(false);
    const [nextDays, setNextDays] = useState([]);
    const [selectedPageId, setSelectedPageId] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);

    const calculateRating = (data) => {
        let sum = 0;
        data.forEach((review) => {
            sum += review.Rating;
        });
        setRating((sum / data.length).toFixed(2) || 0);
    };

    const parseDates = (screeningsData) => {
        const arr = screeningsData.map((screening) => {
            const date = new Date(screening.Date);
            const day = date.getDay();
            const days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ];

            const time = screening.Time.split(":");
            const hours = time[0];
            const minutes = time[1];
            return {
                ...screening,
                Time: `${hours}:${minutes}`,
                day: days[day - 1],
            };
        });

        setScreenings(arr);
    };

    const loadMovie = async () => {
        try {
            const response = await axios.get(`/api/api/movies/movie/${id}`);
            setMovie(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const loadGenres = async () => {
        try {
            const response = await axios.get(`/api/api/genres/${id}`);
            const genres = response.data.map((genre) => genre.GenreName);
            setMovie((prev) => ({ ...prev, Genres: genres.join(", ") }));
        } catch (error) {
            console.error(error);
        }
    };

    const loadReviewsPage = async () => {
        try {
            const response = await axios.get(
                `/api/api/reviews/page/${selectedPageId}/${id}`
            );
            setReviews(response.data.result);
            setNumberOfPages(response.data.pages);
        } catch (error) {
            console.error(error);
        }
    };

    const loadReviews = async () => {
        try {
            const response = await axios.get(`/api/api/reviews/${id}`);
            const data = response.data;
            calculateRating(data);
            const userReview = data.filter(
                (review) =>
                    review.Username ===
                    JSON.parse(localStorage.getItem("user"))["Username"]
            )[0];

            if (userReview) {
                setUserReview(true);
                setIsStarClicked(userReview.Rating);
                setReviewText(userReview.Description);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadScreenings = async () => {
        try {
            const response = await axios.get(`/api/api/screenings/${id}`);
            setScreenings(response.data);
            parseDates(response.data);
        } catch (error) {
            if (error.response.status == 404) {
                setScreenings([]);
                setNextDays([]);
            } else {
                console.error(error);
            }
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const review = reviewText;
        const rating = isStarClicked;
        const movieId = Number(id);

        try {
            if (!userReview) {
                const response = await axios.post(`/api/api/reviews`, {
                    movieId,
                    description: review,
                    rating,
                });
            } else {
                const response = await axios.put(`/api/api/reviews`, {
                    movieId,
                    description: review,
                    rating,
                });
            }
            loadReviews();
            loadReviewsPage();
        } catch (error) {
            console.error(error);
        } finally {
            setReviewText("");
            setIsStarClicked(0);
        }
    };

    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleScreeningClick = (id) => {
        navigate(`/ticket/${id}`);
    };

    useEffect(() => {
        loadMovie();
        loadReviews();
        loadReviewsPage();
        loadScreenings();
        loadGenres();
    }, []);

    useEffect(() => {
        // calculateRating();
    }, [reviews]);

    useEffect(() => {
        if (screenings.length === 0) return;
        const tmp = [];

        screenings.forEach((screening) => {
            if (!tmp.includes(screening.day) && screening.day) {
                tmp.push(screening.day);
            }
        });
        setNextDays([...tmp]);
    }, [screenings]);

    return (
        <>
            <div class="movie-card">
                <div class="movie-card-first">
                    <div class="movie-card-image">
                        <img src={movie.Image} alt="movie1" />
                    </div>

                    <div class="movie-text">
                        <h2 class="movie-title">{movie.Name}</h2>
                        <p class="movie-description">{movie.Description}</p>
                        <p class="movie-genre">Genres: {movie.Genres}</p>
                    </div>
                </div>

                <p class="movie-card-rating">Rating: {rating}</p>

                <div class="movie-tickets">
                    <p class="movie-buy-ticket">Buy a ticket</p>

                    {screenings.length > 0 ? (
                        nextDays.map((day) => (
                            <div class="movie-day-projection">
                                <p class="movie-day">{day}</p>
                                <div class="movie-projections">
                                    {screenings
                                        .filter(
                                            (screening) => screening.day === day
                                        )
                                        .map((screening) => {
                                            return (
                                                <div
                                                    class="movie-projection"
                                                    onClick={(e) =>
                                                        handleScreeningClick(
                                                            screening.ID
                                                        )
                                                    }
                                                >
                                                    <p>{screening.Time}</p>
                                                    <p>
                                                        Hall {screening.HallID}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div class="not-found-text">
                            No screenings available for the next 10 days.
                        </div>
                    )}
                </div>

                <div class="movie-rating-container">
                    <ReviewStars
                        selected={isStarClicked}
                        setSelected={setIsStarClicked}
                        userReview={userReview}
                    />

                    <form class="movie-review-form">
                        <textarea
                            class="movie-rating-input-textarea"
                            name="rating"
                            id="rating"
                            placeholder="Write a review"
                            onChange={(e) => handleReviewTextChange(e)}
                            value={reviewText}
                        ></textarea>

                        <input
                            class="movie-rating-input-submit"
                            type="submit"
                            value="Submit"
                            onClick={(e) => handleReviewSubmit(e)}
                        />
                    </form>

                    <div class="reviews-container">
                        <h2 class="reviews-text">Reviews</h2>

                        <div class="review-card-container">
                            {reviews.map((review) => (
                                <ReviewCard
                                    movieId={review.MovieID}
                                    author={review.Username}
                                    authorImage={review.Image}
                                    description={review.Description}
                                    rating={review.Rating}
                                />
                            ))}
                        </div>
                        <div class="reviews-pages">
                            <PaginationNumbers
                                selectedPageId={selectedPageId}
                                numberOfPages={numberOfPages}
                                setPageId={setSelectedPageId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleMovie;
