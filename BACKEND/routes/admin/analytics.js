const express = require('express');
const User = require('../../models/User');
const Post = require('../../models/Post');
const SupportTicket = require('../../models/SupportTicket');
const MoodLog = require('../../models/MoodLog');
const Resource = require('../../models/Resource'); // ADDED THIS
const { authenticateToken, isAdmin } = require('../../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken, isAdmin);

router.get('/', async (req, res) => {
    try {
        // Summary counts
        const totalUsers = await User.countDocuments({ role: 'student' });
        const flaggedPosts = await Post.countDocuments({ flagged: true });
        const pendingTickets = await SupportTicket.countDocuments({ status: 'pending' });

        // Mood distribution
        const moodDistribution = await MoodLog.aggregate([
            { $group: { _id: '$mood', count: { $sum: 1 } } }
        ]);

        // --- NEW: CONTENT POPULARITY AGGREGATION ---
        const contentPopularity = await Resource.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } } // Sort by most popular
        ]);

        const analyticsData = {
            summary: { totalUsers, flaggedPosts, pendingTickets },
            moodDistribution,
            contentPopularity // ADDED THIS
        };

        res.json(analyticsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;