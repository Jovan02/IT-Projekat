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

const createReview = (req, res) => {};

module.exports = { getReviews, createReview };
