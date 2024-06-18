const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

function countTickets(username) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) NumOfTickets FROM ticket WHERE Username = ?`;
        db.query(query, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

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
        const { seats } = req.body;
        const query = `INSERT INTO ticket (Username, ScreeningID, SeatRow, SeatColumn, HallID) VALUES (?, ?, ?, ?, ?)`;

        for (let i = 0; i < seats.length; i++) {
            const { screeningId, seatRow, seatColumn, hallId } = seats[i];
            db.query(
                query,
                [username, screeningId, seatRow, seatColumn, hallId],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: err });
                    }
                }
            );
        }
        return res.status(200).json({
            message: "Tickets created successfully",
        });
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const getTicketsByUserId = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;
        countTickets(username).then((result) => {
            const numOfTickets = result[0].NumOfTickets;
            const pages = Math.ceil(numOfTickets / 6);
            const { id } = req.params;
            const limit = 6;
            const offset = (id - 1) * limit;

            const query = `SELECT * FROM ticket t INNER JOIN screening s ON t.ScreeningID = s.ID INNER JOIN movie m ON s.MovieID = m.ID WHERE Username = ? ORDER BY s.Date LIMIT ?, ?`;
            db.query(query, [username, offset, limit], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "There was an error getting the tickets",
                    });
                } else {
                    return res
                        .status(200)
                        .json({ result: result, page: id, pages: pages });
                }
            });
        });
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { getTicketsById, createTicket, getTicketsByUserId };
