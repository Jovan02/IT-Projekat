const express = require("express");
const { getReviews, createReview } = require("../controllers/reviews.js");

const router = express.Router();

router.get("/:id", getReviews);

router.post("/create", createReview);
