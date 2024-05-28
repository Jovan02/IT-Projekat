import React, { useContext, useEffect, useRef } from "react";
import "../styles/Ticket.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Seat from "../components/Seat";
import AuthContext from "../AuthContext";

const Ticket = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [screeningMovie, setScreeningMovie] = useState({});
    const [boughtTickets, setBoughtTickets] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState({ row: "", col: "" });

    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

    const seatsRef = useRef([]);

    const loadData = async () => {
        try {
            const response = await axios.get(`/api/api/screenings/movie/${id}`);
            setScreeningMovie(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const loadTickets = async () => {
        try {
            const response = await axios.get(`/api/api/tickets/ticket/${id}`);
            setBoughtTickets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const setAlreadyTakenSeats = () => {
        seatsRef.current.forEach((seat) => {
            boughtTickets.forEach((ticket) => {
                if (
                    seat &&
                    ticket.SeatRow == seat.dataset.row &&
                    ticket.SeatColumn == seat.dataset.column
                ) {
                    seat.dataset.taken = "true";
                    seat.classList.add("seat-taken");
                }
            });
        });
    };

    const handleSeatClick = (e, row, col) => {
        e.preventDefault();
        console.log("DA LI JE ZAUZETO: ", e.target.parentElement.dataset.taken);
        if (e.target.parentElement.dataset.taken == "true") {
            return;
        } else if (selectedSeat.row == row && selectedSeat.col == col) {
            setSelectedSeat({ row: "", col: "" });
            e.target.classList.remove("selected");
            e.target.classList.add("unselected");
        } else if (selectedSeat.row != "" && selectedSeat.col != "") {
            return;
        } else {
            setSelectedSeat({ row: row, col: col });
            if (e.target.classList.contains("selected")) {
                e.target.classList.remove("selected");
                e.target.classList.add("unselected");
            } else {
                e.target.classList.remove("unselected");
                e.target.classList.add("selected");
            }
        }
    };

    const handleBuyTicket = async () => {
        if (selectedSeat.row == "" || selectedSeat.col == "") {
            alert("Please select a seat.");
            return;
        }

        try {
            const response = await axios.post(`/api/api/tickets`, {
                screeningId: id,
                seatRow: selectedSeat.row,
                seatColumn: selectedSeat.col,
                hallId: screeningMovie.HallID,
            });
            navigate(`/movie/${screeningMovie.MovieID}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
        loadTickets();
    }, []);

    useEffect(() => {
        // setAlreadyTakenSeats();
    }, [boughtTickets]);

    useEffect(() => {
        console.log(selectedSeat);
    }, [selectedSeat]);

    useEffect(() => {
        // console.log(seatsRef.current);
        console.log("oli se pokrenut nekad");
        setAlreadyTakenSeats();
    }, [seatsRef, boughtTickets]);

    return (
        <>
            <div className="ticket-container">
                <h2 className="movie-title">{screeningMovie.Name}</h2>
                <p className="date-text">
                    {new Date(screeningMovie.Date).toDateString()}
                </p>
                <p className="time-text">{screeningMovie.Time}</p>

                <div className="seat-container">
                    {Array.from({ length: 14 }).map((_, index) => {
                        if (index == 0 || index == 6)
                            return <div className="seat"></div>;
                        else if (index > 6)
                            return <div className="seat">{index - 1}</div>;
                        else return <div className="seat">{index}</div>;
                    })}

                    {rows.map((letter, indexRow) => {
                        if (indexRow <= 5) {
                            return (
                                <>
                                    <div
                                        className={
                                            "seat row--" + String(indexRow + 1)
                                        }
                                    >
                                        {letter}
                                    </div>
                                    {Array.from({ length: 13 }).map(
                                        (_, indexCol) => {
                                            if (indexCol == 5)
                                                return (
                                                    <div className="seat"></div>
                                                );
                                            else
                                                return (
                                                    <div
                                                        className={
                                                            "seat row--" +
                                                            String(
                                                                indexRow + 1
                                                            ) +
                                                            " col--" +
                                                            String(indexCol + 1)
                                                        }
                                                    >
                                                        <Seat
                                                            row={indexRow + 1}
                                                            column={
                                                                indexCol + 1
                                                            }
                                                            reference={(el) =>
                                                                seatsRef.current.push(
                                                                    el
                                                                )
                                                            }
                                                            taken={false}
                                                            clickEvent={(e) =>
                                                                handleSeatClick(
                                                                    e,
                                                                    indexRow +
                                                                        1,
                                                                    indexCol + 1
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                );
                                        }
                                    )}
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <div
                                        className={
                                            "seat row--" + String(indexRow + 1)
                                        }
                                    >
                                        {letter}
                                    </div>
                                    {Array.from({ length: 13 }).map(
                                        (_, indexCol) => {
                                            if (indexCol == 5)
                                                return (
                                                    <div className="seat"></div>
                                                );
                                            else if (indexCol >= 10)
                                                return (
                                                    <div className="seat"></div>
                                                );
                                            else
                                                return (
                                                    <div
                                                        className={
                                                            "seat row--" +
                                                            String(
                                                                indexRow + 1
                                                            ) +
                                                            " col--" +
                                                            String(indexCol + 1)
                                                        }
                                                    >
                                                        <Seat
                                                            row={indexRow + 1}
                                                            column={
                                                                indexCol + 1
                                                            }
                                                            reference={(el) =>
                                                                seatsRef.current.push(
                                                                    el
                                                                )
                                                            }
                                                            taken={false}
                                                            clickEvent={(e) =>
                                                                handleSeatClick(
                                                                    e,
                                                                    indexRow +
                                                                        1,
                                                                    indexCol + 1
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                );
                                        }
                                    )}
                                </>
                            );
                        }
                    })}
                </div>

                <div className="screen"></div>

                <button className="button-buy" onClick={handleBuyTicket}>
                    Buy Ticket
                </button>
            </div>
        </>
    );
};

export default Ticket;
