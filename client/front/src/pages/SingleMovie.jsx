import React, { useEffect } from "react";
import "../styles/SingleMovie.css";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useRef } from "react";

const SingleMovie = () => {
    const URL = "http://localhost:8000";

    const id = useParams().id;

    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [isStarClicked, setIsStarClicked] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const starsRef = useRef(
        Array(5)
            .fill(null)
            .map(() => React.createRef())
    );

    const hoverStar = (index) => {
        for (let i = 0; i < index + 1; i++) {
            starsRef.current[i].style.stroke = "#e94f37";
            starsRef.current[i].style.fill = "#e94f37";
        }
    };

    const hoverStarLeave = (index) => {
        if (isStarClicked && index + 1 <= isStarClicked) return;
        for (let i = 0; i < index + 1; i++) {
            starsRef.current[i].style.stroke = "#393e41";
            starsRef.current[i].style.fill = "#d9d9d9";
        }
        for (let i = 0; i < isStarClicked; i++) {
            starsRef.current[i].style.stroke = "#e94f37";
            starsRef.current[i].style.fill = "#e94f37";
        }
    };

    const starClicked = (index) => {
        setIsStarClicked(index + 1);
        for (let i = 0; i < 5; i++) {
            starsRef.current[i].style.stroke = "#393e41";
            starsRef.current[i].style.fill = "#d9d9d9";
        }
        for (let i = 0; i < index + 1; i++) {
            starsRef.current[i].style.stroke = "#e94f37";
            starsRef.current[i].style.fill = "#e94f37";
        }
    };

    const flushStars = () => {
        for (let i = 0; i < 5; i++) {
            starsRef.current[i].style.stroke = "#393e41";
            starsRef.current[i].style.fill = "#d9d9d9";
        }
    };

    const calculateRating = () => {
        let sum = 0;
        reviews.forEach((review) => {
            sum += review.Rating;
        });
        setRating(sum / reviews.length || 0);
    };

    const loadMovie = async () => {
        try {
            const response = await axios.get(`${URL}/api/movies/${id}`);
            setMovie(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const loadReviews = async () => {
        try {
            const response = await axios.get(`${URL}/api/reviews/${id}`);
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const review = reviewText;
        const rating = isStarClicked;
        const movieId = Number(id);
        const userId = 14;

        try {
            const response = await axios.post(`${URL}/api/reviews`, {
                userId,
                movieId,
                description: review,
                rating,
            });
            loadReviews();
        } catch (error) {
            console.error(error);
        } finally {
            setReviewText("");
            setIsStarClicked(0);
            flushStars();
        }
    };

    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    useEffect(() => {
        loadMovie();
        loadReviews();
    }, []);

    useEffect(() => {
        calculateRating();
    }, [reviews]);

    return (
        <div class="main">
            <div class="title">
                <h1>CINEMAXX</h1>
            </div>

            <div class="main-container">
                <div class="movie-card">
                    <div class="movie-card-first">
                        <div class="movie-card-image">
                            <img src={movie.Image} alt="movie1" />
                        </div>

                        <div class="movie-text">
                            <h2 class="movie-title">{movie.Name}</h2>
                            <p class="movie-description">{movie.Description}</p>
                        </div>
                    </div>

                    <p class="movie-card-rating">Rating: {rating}</p>

                    <div class="movie-tickets">
                        <p class="movie-buy-ticket">Buy a ticket</p>

                        <div class="movie-day-projection">
                            <p class="movie-day">Monday</p>
                            <div class="movie-projections">
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                            </div>
                        </div>
                        <div class="movie-day-projection">
                            <p class="movie-day">Tuesday</p>
                            <div class="movie-projections">
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                            </div>
                        </div>
                        <div class="movie-day-projection">
                            <p class="movie-day">Wednesday</p>
                            <div class="movie-projections">
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                            </div>
                        </div>
                        <div class="movie-day-projection">
                            <p class="movie-day">Thursday</p>
                            <div class="movie-projections">
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                            </div>
                        </div>
                        <div class="movie-day-projection">
                            <p class="movie-day">Friday</p>
                            <div class="movie-projections">
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                                <div class="movie-projection">
                                    <p>16:30</p>
                                    <p>Hall 6</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="movie-rating-container">
                        <div class="movie-rating-stars">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icon-star"
                                onMouseEnter={(e) => hoverStar(0)}
                                onMouseLeave={(e) => hoverStarLeave(0)}
                                onClick={(e) => starClicked(0)}
                                ref={(el) => (starsRef.current[0] = el)}
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icon-star"
                                onMouseEnter={(e) => hoverStar(1)}
                                onMouseLeave={(e) => hoverStarLeave(1)}
                                onClick={(e) => starClicked(1)}
                                ref={(el) => (starsRef.current[1] = el)}
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icon-star"
                                onMouseEnter={(e) => hoverStar(2)}
                                onMouseLeave={(e) => hoverStarLeave(2)}
                                onClick={(e) => starClicked(2)}
                                ref={(el) => (starsRef.current[2] = el)}
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icon-star"
                                onMouseEnter={(e) => hoverStar(3)}
                                onMouseLeave={(e) => hoverStarLeave(3)}
                                onClick={(e) => starClicked(3)}
                                ref={(el) => (starsRef.current[3] = el)}
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icon-star"
                                onMouseEnter={(e) => hoverStar(4)}
                                onMouseLeave={(e) => hoverStarLeave(4)}
                                onClick={(e) => starClicked(4)}
                                ref={(el) => (starsRef.current[4] = el)}
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        </div>

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
                                        author={review.Username}
                                        description={review.Description}
                                        rating={review.Rating}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMovie;
