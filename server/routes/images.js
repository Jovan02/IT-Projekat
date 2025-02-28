const express = require("express");
const { sendImage } = require("../controllers/images.js");

const router = express.Router();

router.post("/", sendImage);

module.exports = router;
