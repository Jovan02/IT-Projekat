const db = require("../db");

const getHalls = (req, res) => {
    const query = `SELECT * FROM hall`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    });
};

module.exports = { getHalls };
