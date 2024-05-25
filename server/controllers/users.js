const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

function countUsers() {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) NumOfUsers FROM user`;
        db.query(query, [], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

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

    countUsers().then((result) => {
        const numOfUsers = result[0].NumOfUsers;
        const pages = Math.ceil(numOfUsers / 6);
        const { id } = req.params;

        const limit = 6;
        const offset = (id - 1) * limit;

        const query = `SELECT Username FROM user ORDER BY Username LIMIT ?, ?`;
        db.query(query, [offset, limit], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            } else {
                return res
                    .status(200)
                    .json({ result: result, page: id, pages: pages });
            }
        });
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
        if (decoded.isAdmin != 1) {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { username } = req.params;
    const query = `DELETE FROM user WHERE Username = ?`;
    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            return res.status(200).json({ message: "User deleted" });
        }
    });
};

module.exports = { getUsers, updateUser, deleteUser };
