const db = require("../db");

const getGenres = (req, res) => {
    const query = `SELECT * FROM genre`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    });
};

module.exports = { getGenres };
