const db = require("../db");

const getTicketsById = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM tickets WHERE ScreeningID = ?`;
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

const createTicket = (req, res) => {
    const { userId, screeningId, seatRow, seatColumn, hallId } = req.body;
    const query = `INSERT INTO tickets (UserID, ScreeningID, SeatRow, SeatColumn, HallID) VALUES (?, ?, ?, ?, ?)`;
    db.query(
        query,
        [userId, screeningId, seatRow, seatColumn, hallId],
        (err, result) => {
            if (err) {
                res.status(500).json({
                    message: "There was an error creating the ticket",
                });
            } else {
                res.json({
                    message: "Ticket created successfully",
                });
            }
        }
    );
};

module.exports = { getTicketsById, createTicket };
