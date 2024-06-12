const express = require("express");

const {
    getScreenings,
    createScreening,
    getScreeningsForNextDays,
    getScreening,
    getMoviesScreenings,
} = require("../controllers/screenings.js");

const router = express.Router();

router.get("/", getScreenings);
router.get("/movies", getMoviesScreenings);
router.get("/movie/:id", getScreening);
router.get("/:id", getScreeningsForNextDays);
router.post("/", createScreening);

module.exports = router;
