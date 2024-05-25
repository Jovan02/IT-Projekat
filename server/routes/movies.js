const express = require("express");
const {
    getMovies,
    getMovie,
    createMovie,
} = require("../controllers/movies.js");

const router = express.Router();

router.get("/:id", getMovies);
router.get("/movie/:id", getMovie);
router.post("/", createMovie);

module.exports = router;
