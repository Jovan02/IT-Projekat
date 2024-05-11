const express = require("express");
const { getReviews, createReview } = require("../controllers/reviews.js");

const router = express.Router();

router.get("/", getReviews);

router.post("/", createReview);

module.exports = router;
