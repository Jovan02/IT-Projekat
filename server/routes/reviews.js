const express = require("express");
const {
    getReviews,
    createReview,
    updateReview,
} = require("../controllers/reviews.js");

const router = express.Router();

router.get("/:id", getReviews);
router.post("/", createReview);
router.put("/", updateReview);

module.exports = router;
