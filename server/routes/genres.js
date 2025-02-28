const express = require("express");
const { getGenres, getMovieGenres } = require("../controllers/genres.js");

const router = express.Router();

router.get("/", getGenres);
router.get("/:id", getMovieGenres);

module.exports = router;
