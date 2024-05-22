const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const getMovies = (req, res) => {
    const query = `SELECT * FROM movie`;
    db.query(query, [], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: "No movies found" });
        } else {
            res.status(200).json(result);
        }
    });
};

const getMovie = (req, res) => {
    const query = `SELECT * FROM movie WHERE ID = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: "Movie not found" });
        } else {
            res.status(200).json(result);
        }
    });
};

function findMovieIdPromise() {
    const findIdQuery = `SELECT ID FROM movie ORDER BY ID DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
        db.query(findIdQuery, [], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res[0].ID);
            }
        });
    });
}

function addMoviePromise(name, image, description, duration) {
    const insertMovieQuery = `INSERT INTO movie(Name, Image, Description, Duration) VALUES(?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(
            insertMovieQuery,
            [name, image, description, duration],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function addGenresPromise(movieId, genres) {
    const insertGenresQuery = `INSERT INTO moviegenre(MovieID, GenreName) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
        genres.map((genre) => {
            db.query(insertGenresQuery, [movieId, genre], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    });
}

const createMovie = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, image, description, duration, genres } = req.body;
    try {
        const addMovie = await addMoviePromise(
            name,
            image,
            description,
            duration
        );

        const findMovieIdResult = await findMovieIdPromise();

        const insertGenresQuery = await addGenresPromise(
            findMovieIdResult,
            genres
        );

        return res.status(200).json({ message: "Added successfully." });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = { getMovies, getMovie, createMovie };
