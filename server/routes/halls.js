const express = require("express");
const { getHalls } = require("../controllers/halls.js");

const router = express.Router();

router.get("/", getHalls);

module.exports = router;
