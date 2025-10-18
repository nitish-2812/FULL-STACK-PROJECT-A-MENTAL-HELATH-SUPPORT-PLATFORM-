const express = require('express');
const SupportTicket = require('../../models/SupportTicket');
const { authenticateToken, isAdmin } = require('../../middleware/authMiddleware');
const router = express.Router();

// Protect all routes for admins
router.use(authenticateToken, isAdmin);

// GET all support tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await SupportTicket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT to update a ticket's status (e.g., to 'resolved')
router.put('/:id', async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }, // e.g., { "status": "resolved" }
            { new: true }
        );
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;