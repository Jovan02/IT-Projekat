const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

function countReviews(movieId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) NumOfReviews FROM review WHERE MovieID = ?`;
        db.query(query, [movieId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const getAllReviews = (req, res) => {
    const query = `SELECT * FROM review WHERE MovieID = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: "No reviews found" });
        } else {
            res.status(200).json(result);
        }
    });
};

const createReview = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;

        const { movieId, description, rating } = req.body;
        const query = `INSERT INTO review(Username, MovieID, Description, Rating) VALUES (?, ?, ?, ?)`;

        db.query(
            query,
            [username, movieId, description, rating],
            (err, result) => {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    res.status(200).json({
                        message: "Review created successfully",
                    });
                }
            }
        );
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const updateReview = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;

        const { movieId, description, rating } = req.body;
        const query = `UPDATE review SET Description = ?, Rating = ? WHERE MovieID = ? AND Username = ?`;

        db.query(
            query,
            [description, rating, movieId, username],
            (err, result) => {
                if (err) {
                    res.status(500).json({ message: err });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ message: "Review not found" });
                } else {
                    res.status(200).json({
                        message: "Review updated successfully",
                    });
                }
            }
        );
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const getReviewsPage = (req, res) => {
    const { id, movieId } = req.params;

    countReviews(movieId).then((result) => {
        const numOfReviews = result[0].NumOfReviews;
        const pages = Math.ceil(numOfReviews / 10);
        const query = `SELECT * FROM review WHERE MovieID = ? ORDER BY Username LIMIT ?, ?`;
        const limit = 10;
        const offset = (id - 1) * limit;

        db.query(query, [movieId, offset, limit], (err, result2) => {
            if (err) {
                res.status(500).json({ message: err });
            } else if (result2.length === 0) {
                res.status(404).json({ message: "No reviews found" });
            } else {
                res.status(200).json({
                    result: result2,
                    page: id,
                    pages: pages,
                });
            }
        });
    });
};

const deleteReview = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isAdmin = decoded.isAdmin;
        const decodedUsername = decoded.username;
        const { movieId, username } = req.params;
        if (!isAdmin && decodedUsername != username) {
            return res.status(403).json({ message: "Forbidden" });
        }
        const query = `DELETE FROM review WHERE MovieID = ? AND Username = ?`;

        db.query(query, [movieId, username], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            } else if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Review not found" });
            } else {
                return res.status(200).json({
                    message: "Review deleted successfully",
                });
            }
        });
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = {
    getAllReviews,
    createReview,
    updateReview,
    getReviewsPage,
    deleteReview,
};
