const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

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
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
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
    const query = `SELECT * FROM screening WHERE MovieID = ? AND (Date > CURDATE() OR (Date = CURDATE() AND TIME(Time) > CURTIME())) AND Date <= DATE_ADD(CURDATE(), INTERVAL 10 DAY)`;
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

const getScreening = (req, res) => {
    const query = `SELECT * FROM screening s INNER JOIN movie m ON s.MovieID = m.ID WHERE s.ID = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: "Screening not found" });
        } else {
            res.status(200).json(result);
        }
    });
};

const getMoviesScreenings = (req, res) => {
    const { dateFrom, dateTo, genres } = req.query;

    console.log(dateFrom, dateTo, genres);
    let genresList = "";
    if (genres) {
        const query = `
            SELECT DISTINCT s.ID, s.Date, s.Time, m.Duration, s.MovieID, m.Name, m.Image, s.HallID
            FROM screening s
            INNER JOIN movie m
            ON s.MovieID = m.ID
            INNER JOIN moviegenre mg
            ON s.MovieID = mg.MovieID
            WHERE s.Date >= ? AND s.Date <= ? AND mg.GenreName IN (?)`;
        genres.forEach((genre) => {
            genresList += `'${genre}',`;
        });
        db.query(query, [dateFrom, dateTo, genresList], (err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            } else if (result.length === 0) {
                res.status(404).json({ message: "No screenings found" });
            } else {
                res.status(200).json(result);
            }
        });
    } else {
        const query = `
            SELECT DISTINCT s.ID, s.Date, s.Time, m.Duration, s.MovieID, m.Name, m.Image, s.HallID
            FROM screening s
            INNER JOIN movie m
            ON s.MovieID = m.ID
            INNER JOIN moviegenre mg
            ON s.MovieID = mg.MovieID
            WHERE s.Date >= ? AND s.Date <= ?`;
        db.query(query, [dateFrom, dateTo], (err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            } else if (result.length === 0) {
                res.status(404).json({ message: "No screenings found" });
            } else {
                console.log(result);
                res.status(200).json(result);
            }
        });
    }
};

module.exports = {
    getScreenings,
    createScreening,
    getScreeningsForNextDays,
    getScreening,
    getMoviesScreenings,
};
