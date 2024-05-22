const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const getTicketsById = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ticket WHERE ScreeningID = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({
                message: "There was an error getting the tickets",
            });
        } else if (result.length === 0) {
            res.status(404).json({
                message: "No tickets found",
            });
        } else {
            res.json(result);
        }
    });
};

const createTicket = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;
        const { screeningId, seatRow, seatColumn, hallId } = req.body;
        const query = `INSERT INTO ticket (Username, ScreeningID, SeatRow, SeatColumn, HallID) VALUES (?, ?, ?, ?, ?)`;
        db.query(
            query,
            [username, screeningId, seatRow, seatColumn, hallId],
            (err, result) => {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    res.json({
                        message: "Ticket created successfully",
                    });
                }
            }
        );
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};

const getTicketsByUserId = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ticket t INNER JOIN screening s ON t.ScreeningID = s.ID INNER JOIN movie m ON s.MovieID = m.ID WHERE Username = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({
                message: "There was an error getting the tickets",
            });
        } else {
            res.json(result);
        }
    });
};

module.exports = { getTicketsById, createTicket, getTicketsByUserId };
