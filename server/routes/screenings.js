const express = require("express");

const {
    getScreenings,
    createScreening,
} = require("../controllers/screenings.js");

const router = express.Router();

router.get("/", getScreenings);

router.post("/", createScreening);

module.exports = router;
