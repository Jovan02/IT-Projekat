const express = require("express");
const {
    getAllReviews,
    getReviewsPage,
    createReview,
    updateReview,
} = require("../controllers/reviews.js");

const router = express.Router();

router.get("/:id", getAllReviews);
router.get("/page/:id/:movieId", getReviewsPage);
router.post("/", createReview);
router.put("/", updateReview);

module.exports = router;
