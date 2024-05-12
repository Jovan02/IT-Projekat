const db = require("../db");

const getReviews = (req, res) => {
    const query = `SELECT * FROM review WHERE MovieID = ?`;
    db.query(query, [req.body.movieId], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else if (result.length === 0) {
            res.status(404).json("No reviews found");
        } else {
            res.status(200).json("Reviews...");
        }
    });
};

const createReview = (req, res) => {
    const { userId, movieId, description, rating } = req.body;

    const query = `INSERT INTO review(UserID, MovieID, Description, Rating) VALUES (?, ?, ?, ?)`;

    db.query(query, [userId, movieId, description, rating], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json("Review created successfully");
        }
    });
};

module.exports = { getReviews, createReview };
