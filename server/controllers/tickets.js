const db = require("../db");

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
    const { userId, screeningId, seatRow, seatColumn, hallId } = req.body;
    const query = `INSERT INTO ticket (UserID, ScreeningID, SeatRow, SeatColumn, HallID) VALUES (?, ?, ?, ?, ?)`;
    db.query(
        query,
        [userId, screeningId, seatRow, seatColumn, hallId],
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
};

const getTicketsByUserId = (req, res) => {
    const { id } = req.body;
    const query = `SELECT * FROM tickets t INNER JOIN movie m ON t.MovieID = m.ID WHERE UserID = ?`;
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
