const express = require("express");
const {
    getTicketsById,
    createTicket,
    getTicketsByUserId,
} = require("../controllers/tickets.js");

const router = express.Router();

router.get("/user", getTicketsByUserId);
router.get("/ticket/:id", getTicketsById);
router.post("/", createTicket);

module.exports = router;
