const db = require("../db");

const getScreenings = (req, res) => {
    const query = `SELECT * FROM screening WHERE MovieID = ?`;
    db.query(query, [req.body.movieId], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: "No screenings found" });
        } else {
            res.status(200).json(result);
        }
    });
};

const createScreening = (req, res) => {
    const { date, time, movieId, hallId } = req.body;
    const query = `INSERT INTO screening (Date, Time, MovieID, HallID) VALUES (?, ?, ?, ?)`;
    db.query(query, [date, time, movieId, hallId], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = { getScreenings, createScreening };
