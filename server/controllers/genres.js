const db = require("../db");

const getMovieGenres = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM moviegenre WHERE MovieID = ?`;

    db.query(query, id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
};

const getGenres = (req, res) => {
    const query = `SELECT * FROM genre`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
};

module.exports = { getGenres, getMovieGenres };
