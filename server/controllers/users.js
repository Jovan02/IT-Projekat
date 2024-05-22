const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const getUsers = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const query = `SELECT Username FROM user`;
    db.query(query, [], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            return res.status(200).json(result);
        }
    });
};

const updateUser = (req, res) => {
    const { username, email, userId } = req.body;
    const query = `UPDATE user SET Username = ?, Email = ? WHERE Username = ?`;
    db.query(query, [username, email, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            return res.status(200).json({ message: "User updated" });
        }
    });
};

const deleteUser = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const query = `DELETE FROM user WHERE Username = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            return res.status(200).json({ message: "User deleted" });
        }
    });
};

module.exports = { getUsers, updateUser, deleteUser };
