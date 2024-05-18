const express = require("express");
const { getGenres } = require("../controllers/genres.js");

const router = express.Router();

router.get("/", getGenres);

module.exports = router;
