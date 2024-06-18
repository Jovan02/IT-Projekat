import React, { useEffect, useRef } from "react";
import "../styles/SingleMovie.css";

const ReviewStars = ({ selected, setSelected, submitted, userReview }) => {
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
        if (selected && index + 1 <= selected) return;
        for (let i = 0; i < index + 1; i++) {
            starsRef.current[i].style.stroke = "#393e41";
            starsRef.current[i].style.fill = "#d9d9d9";
        }
        for (let i = 0; i < selected; i++) {
            starsRef.current[i].style.stroke = "#e94f37";
            starsRef.current[i].style.fill = "#e94f37";
        }
    };

    const starClicked = (index) => {
        setSelected(index + 1);
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

    useEffect(() => {
        if (submitted) {
            flushStars();
        }
    }, [submitted]);

    useEffect(() => {
        if (userReview) {
            setSelected(userReview.rating);
            for (let i = 0; i < userReview.rating; i++) {
                starsRef.current[i].style.stroke = "#e94f37";
                starsRef.current[i].style.fill = "#e94f37";
            }
        }
    }, [userReview]);

    useEffect(() => {
        if (selected == 0) {
            flushStars();
        } else {
            starClicked(selected - 1);
        }
    }, [selected]);

    return (
        <div className="movie-rating-stars">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="icon-star"
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
                className="icon-star"
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
                className="icon-star"
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
                className="icon-star"
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
                className="icon-star"
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
    );
};

export default ReviewStars;
