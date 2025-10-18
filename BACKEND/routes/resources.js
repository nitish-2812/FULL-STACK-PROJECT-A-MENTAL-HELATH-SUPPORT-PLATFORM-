const express = require('express');
const Resource = require('../models/Resource');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// GET all resources for any logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;