const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const getReviews = (req, res) => {
    const query = `SELECT * FROM review r INNER JOIN user u ON r.Username=u.Username WHERE MovieID = ?`;
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

module.exports = { getReviews, createReview };
