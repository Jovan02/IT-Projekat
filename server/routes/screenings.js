const express = require("express");

const {
    getScreenings,
    createScreening,
} = require("../controllers/screenings.js");

const router = express.Router();

router.get("/:id", getScreenings);

router.post("/create", createScreening);

module.exports = router;
