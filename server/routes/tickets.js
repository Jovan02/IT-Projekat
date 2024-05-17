const express = require("express");
const {
    getTicketsById,
    createTicket,
    getTicketsByUserId,
} = require("../controllers/tickets.js");

const router = express.Router();

router.get("/:id", getTicketsById);
router.post("/", createTicket);
router.get("/user/:id", getTicketsByUserId);

module.exports = router;
