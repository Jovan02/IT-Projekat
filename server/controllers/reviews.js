const db = require("../db");

const getReviews = (req, res) => {
    const query = `SELECT * FROM review r INNER JOIN user u ON r.UserID=u.ID WHERE MovieID = ?`;
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
    const { userId, movieId, description, rating } = req.body;
    const query = `INSERT INTO review(UserID, MovieID, Description, Rating) VALUES (?, ?, ?, ?)`;

    db.query(query, [userId, movieId, description, rating], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "Review created successfully" });
        }
    });
};

module.exports = { getReviews, createReview };
