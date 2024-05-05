const express = require("express");
const {
    getMovies,
    getMovie,
    createMovie,
} = require("../controllers/movies.js");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/create", createMovie);

module.exports = router;
