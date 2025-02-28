const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

function countMovies(search) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) NumOfMovies FROM movie WHERE Name LIKE ?`;
        db.query(query, [search], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const getMoviesList = (req, res) => {
    const query = `SELECT * FROM movie`;
    db.query(query, [], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else if (result.length === 0) {
            return res
                .status(404)
                .json({ message: "No movies found", error: err });
        } else {
            return res.status(200).json(result);
        }
    });
};

const getMovies = (req, res) => {
    const { search } = req.query;
    let searchText = "%";
    if (search) {
        searchText = `%${search}%`;
    }
    countMovies(searchText).then((result) => {
        const numOfMovies = result[0].NumOfMovies;
        const { id } = req.params;

        const limit = 6;
        const pages = Math.ceil(numOfMovies / limit);
        const offset = (id - 1) * limit;

        const query = `SELECT * FROM movie WHERE Name LIKE ? ORDER BY ID LIMIT ?, ?`;
        db.query(query, [searchText, offset, limit], (err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            } else if (result.length === 0) {
                res.status(404).json({ message: "No movies found" });
            } else {
                res.status(200).json({
                    result: result,
                    page: id,
                    pages: pages,
                });
            }
        });
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

function addMoviePromise(name, image, description, duration, trailer) {
    const insertMovieQuery = `INSERT INTO movie(Name, Image, Description, Duration, Trailer) VALUES(?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(
            insertMovieQuery,
            [name, image, description, duration, trailer],
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
    console.log("odje puca stoposto");
    console.log(genres);
    return new Promise((resolve, reject) => {
        genres.map((genre) => {
            console.log(genre);
            db.query(insertGenresQuery, [movieId, genre], (err, res) => {
                console.log("Ziv sam odje.");
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
    console.log("odje ulazi!");
    const { name, image, description, duration, genres, trailer } = req.body;
    console.log("I odje ulazi isto.");
    console.log(genres);
    try {
        const addMovie = await addMoviePromise(
            name,
            image,
            description,
            duration,
            trailer
        );
        console.log("Dovde stigao- ubacio film");

        const findMovieIdResult = await findMovieIdPromise();
        console.log("Nasao ajdi filma.");

        const insertGenresQuery = await addGenresPromise(
            findMovieIdResult,
            genres
        );

        return res.status(200).json({ message: "Added successfully." });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const editMovie = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, description, duration, genres, trailer } = req.body;
    const { id } = req.params;

    const query = `UPDATE movie SET Name = ?, Description = ?, Duration = ?, Trailer = ? WHERE ID = ?`;
    db.query(
        query,
        [name, description, duration, trailer, id],
        (err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            } else {
                addGenresPromise(id, genres);
                res.status(200).json({ message: "Updated successfully." });
            }
        }
    );
};

const deleteMovie = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const query = `DELETE FROM movie WHERE ID = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "Deleted successfully." });
        }
    });
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    getMoviesList,
    editMovie,
    deleteMovie,
};
