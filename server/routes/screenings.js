const express = require("express");

const {
    getScreenings,
    createScreening,
    getScreeningsForNextDays,
    getScreening,
} = require("../controllers/screenings.js");

const router = express.Router();

router.get("/", getScreenings);
router.get("/:id", getScreeningsForNextDays);
router.get("/movie/:id", getScreening);
router.post("/", createScreening);

module.exports = router;
