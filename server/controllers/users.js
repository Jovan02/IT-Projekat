const db = require("../db");

const getUsers = (req, res) => {
    const query = `SELECT ID, Username FROM user`;
    db.query(query, [], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json(result);
        }
    });
};

const updateUser = (req, res) => {
    const { username, email, userId } = req.body;
    const query = `UPDATE user SET Username = ?, Email = ? WHERE ID = ?`;
    db.query(query, [username, email, userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "User updated" });
        }
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM user WHERE ID = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "User deleted" });
        }
    });
};

module.exports = { getUsers, updateUser, deleteUser };
