const express = require('express');
const User = require('../../models/User');
const { authenticateToken, isAdmin } = require('../../middleware/authMiddleware');
const router = express.Router();

// Protect all routes in this file
router.use(authenticateToken, isAdmin);

// GET all users (except other admins)
router.get('/', async (req, res) => {
    try {
        // Find all users that are not admins
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;