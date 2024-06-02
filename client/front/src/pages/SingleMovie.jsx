import React, { useEffect } from "react";
import "../styles/SingleMovie.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useRef } from "react";
import PaginationNumbers from "../components/PaginationNumbers";

const SingleMovie = () => {
    const id = useParams().id;

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

    const calculateRating = (data) => {
        let sum = 0;
        data.forEach((review) => {
            sum += review.Rating;
        });
        setRating(sum / data.length || 0);
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
                for (let i = 0; i < userReview.Rating; i++) {
                    starsRef.current[i].style.stroke = "#e94f37";
                    starsRef.current[i].style.fill = "#e94f37";
                }
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
            flushStars();
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
