const express = require('express');
const router = express.Router();
const { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

// Route për /api/tickets
router.route('/')
    .post(protect, createTicket)
    .get(protect, getTickets);

// Route për /api/tickets/:id
router.route('/:id')
    .get(protect, getTicketById)
    .put(protect, updateTicket)
    .delete(protect, deleteTicket);

module.exports = router;