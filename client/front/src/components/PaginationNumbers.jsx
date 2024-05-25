import React from "react";
import "../styles/AdminPanel.css";

const PaginationNumbers = ({ selectedPageId, numberOfPages, setPageId }) => {
    const handlePageClick = (e) => {
        setPageId(Number(e.target.innerHTML));
    };

    const handleClickLeft = (e) => {
        if (selectedPageId > 3) {
            setPageId(selectedPageId - 3);
        } else {
            setPageId(1);
        }
    };

    const handleClickRight = (e) => {
        console.log(
            "userpageid: ",
            selectedPageId,
            "userpages: ",
            numberOfPages
        );
        if (numberOfPages <= 3) {
            setPageId(numberOfPages);
        } else if (selectedPageId == 1) {
            setPageId(selectedPageId + 4);
        } else if (selectedPageId < numberOfPages - 3) {
            setPageId(selectedPageId + 3);
        } else {
            setPageId(numberOfPages);
        }
    };

    const handleClickMaxLeft = (e) => {
        setPageId(1);
    };

    const handleClickMaxRight = (e) => {
        setPageId(numberOfPages);
    };

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-page icon-page--left"
                onClick={handleClickMaxLeft}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-page icon-page--left"
                onClick={handleClickLeft}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                />
            </svg>

            {Array.from({ length: 3 }, (_, i) => {
                if (selectedPageId == 1) {
                    return selectedPageId + i;
                } else if (selectedPageId < numberOfPages) {
                    return selectedPageId + i - 1;
                } else if (selectedPageId == numberOfPages) {
                    return selectedPageId + i - 2;
                }
            }).map((i) => (
                <button
                    key={i}
                    className={
                        "button-page " +
                        (i == selectedPageId ? "button-page--active " : "")
                    }
                    onClick={handlePageClick}
                >
                    {i}
                </button>
            ))}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-page icon-page--right"
                onClick={handleClickRight}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-page icon-page--right"
                onClick={handleClickMaxRight}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
            </svg>
        </>
    );
};

export default PaginationNumbers;
