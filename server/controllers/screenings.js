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

const getScreeningsForNextDays = (req, res) => {
    const query = `SELECT * FROM screening WHERE MovieID = ? AND Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 10 DAY) AND TIME(Time) > CURTIME()`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: "No screenings found" });
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = { getScreenings, createScreening, getScreeningsForNextDays };
