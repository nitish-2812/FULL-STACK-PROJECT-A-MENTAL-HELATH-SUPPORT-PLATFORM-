const express = require('express');
const SupportTicket = require('../models/SupportTicket');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// POST a new support ticket (any logged-in user can do this)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { subject, message, senderEmail } = req.body;

        const newTicket = new SupportTicket({
            senderEmail,
            subject,
            message
        });
        await newTicket.save();
        res.status(201).json({ message: 'Support ticket submitted successfully. We will get back to you soon.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error while submitting ticket.' });
    }
});

module.exports = router;