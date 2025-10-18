const express = require('express');
const Post = require('../../models/Post');
const { authenticateToken, isAdmin } = require('../../middleware/authMiddleware');
const router = express.Router();

// Protect all routes in this file for admins only
router.use(authenticateToken, isAdmin);

// GET all flagged posts
router.get('/flagged', async (req, res) => {
    try {
        const flaggedPosts = await Post.find({ flagged: true }).sort({ createdAt: -1 });
        res.json(flaggedPosts);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a post (can be used to remove inappropriate content)
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.deleteOne();
        res.json({ message: 'Post removed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;