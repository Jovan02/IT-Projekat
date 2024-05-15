const express = require("express");

const {
    getScreenings,
    createScreening,
    getScreeningsForNextDays,
} = require("../controllers/screenings.js");

const router = express.Router();

router.get("/", getScreenings);
router.get("/:id", getScreeningsForNextDays);
router.post("/", createScreening);

module.exports = router;
