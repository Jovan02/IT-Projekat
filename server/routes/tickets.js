const express = require("express");
const { getTicketsById, createTicket } = require("../controllers/tickets.js");

const router = express.Router();

router.get("/:id", getTicketsById);
router.post("/", createTicket);

module.exports = router;
