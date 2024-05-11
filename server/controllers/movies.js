const db = require("../db");

const getMovies = (req, res) => {
    const query = `SELECT * FROM movie`;
    db.query(query, [], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else if (result.length === 0) {
            res.status(404).json("No movies found");
        } else {
            res.status(200).json("Movies...");
        }
    });
};

const getMovie = (req, res) => {
    const query = `SELECT * FROM movie WHERE ID = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else if (result.length === 0) {
            res.status(404).json("Movie not found");
        } else {
            res.status(200).json("Movie");
        }
    });
};

const createMovie = (req, res) => {};

module.exports = { getMovies, getMovie, createMovie };
