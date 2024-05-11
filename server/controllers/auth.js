const db = require("../db");

const register = (req, res) => {
    const { email, username, password } = req.body;

    const checkQuery = `SELECT * FROM user WHERE Username = ?`;
    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (result.length > 0) {
            res.status(409).json("User already exists");
            return;
        } else {
            const registerQuery = `INSERT INTO user (Email, Username, Password) VALUES (?, ?, ?)`;
            db.query(
                registerQuery,
                [email, username, password],
                (err, result) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(201).json("User registered");
                    }
                }
            );
        }
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM user WHERE Username = ? AND Password = ?`;
    db.query(query, [username, password], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else if (result.length === 0) {
            res.status(401).json("Invalid username or password");
        } else {
            res.status(200).json("Login successful");
        }
    });
};

const logout = (req, res) => {};

module.exports = { register, login, logout };
