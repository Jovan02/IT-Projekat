const express = require("express");
const { getUsers, updateUser, deleteUser } = require("../controllers/users.js");

const router = express.Router();

router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
