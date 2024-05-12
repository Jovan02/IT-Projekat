const db = require("../db");

const getScreenings = (req, res) => {
    const query = `SELECT * FROM screening WHERE MovieID = ?`;
    db.query(query, [req.body.movieId], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else if (result.length === 0) {
            res.status(404).json("No screenings found");
        } else {
            res.status(200).json("Screenings...");
        }
    });
};

const createScreening = (req, res) => {
    const { date, time, movieId, hallId } = req.body;
    const query = `INSERT INTO screening (Date, Time, MovieID, HallID) VALUES (?, ?, ?, ?)`;
    db.query(query, [date, time, movieId, hallId], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json("Screening created");
        }
    });
};

module.exports = { getScreenings, createScreening };
