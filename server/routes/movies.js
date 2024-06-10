const express = require("express");
const {
    getMovies,
    getMovie,
    createMovie,
    getMoviesList,
    editMovie,
    deleteMovie,
} = require("../controllers/movies.js");

const router = express.Router();

router.get("/", getMoviesList);
router.get("/:id", getMovies);
router.get("/movie/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", editMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
