const db = require("../db");

function checkUserExistsPromise(username) {
    return new Promise((resolve, reject) => {
        const checkQuery = `SELECT * FROM user WHERE Username = ?`;
        db.query(checkQuery, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function registerUserPromise(email, username, password) {
    return new Promise((resolve, reject) => {
        const registerQuery = `INSERT INTO user (Email, Username, Password) VALUES (?, ?, ?)`;
        db.query(registerQuery, [email, username, password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const register = (req, res) => {
    const { email, username, password } = req.body;

    checkUserExistsPromise(username)
        .then((result) => {
            if (result.length > 0) {
                res.status(400).json("User already exists");
            } else {
                return registerUserPromise(email, username, password)
                    .then((res) => {
                        res.status(201).json("User created successfully");
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
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
