const express = require("express");
const {
    getUsers,
    updateUserImage,
    updateUserEmail,
    deleteUser,
} = require("../controllers/users.js");

const router = express.Router();

router.get("/:id", getUsers);
router.put("/image", updateUserImage);
router.put("/email", updateUserEmail);
router.delete("/:username", deleteUser);

module.exports = router;
