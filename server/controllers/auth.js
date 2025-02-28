const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: ".env" });

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
        const registerQuery = `INSERT INTO user (Email, Username, Password, Image) VALUES (?, ?, ?, ?)`;
        const image = "/api/public/images/profile-placeholder.jfif";
        db.query(
            registerQuery,
            [email, username, password, image],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

const register = (req, res) => {
    const { email, username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    checkUserExistsPromise(username)
        .then((result) => {
            if (result.length > 0) {
                res.status(400).json({ message: "User already exists" });
            } else {
                registerUserPromise(email, username, hashedPassword)
                    .then((resp) => {
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "Error creating user",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Error checking user" });
        });
};

const login = (req, res) => {
    const { username, password } = req.body;

    checkUserExistsPromise(username)
        .then((result) => {
            if (result.length === 0) {
                return res.status(401).json({ message: "User not found" });
            } else {
                const isPasswordCorrect = bcrypt.compareSync(
                    password,
                    result[0].Password
                );

                if (!isPasswordCorrect) {
                    return res
                        .status(401)
                        .json({ message: "Password incorrect" });
                }
                const token = jwt.sign(
                    {
                        username: result[0].Username,
                        isAdmin: result[0].IsAdmin,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                const { Password, ...other } = result[0];

                return res.status(200).json({ token, ...other });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
};

const logout = (req, res) => {};

module.exports = { register, login, logout };
