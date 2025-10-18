const express = require('express');
const Post = require('../models/Post');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// GET all posts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new post
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      user: req.user.userId,
      userName: req.user.name 
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- NEW ROUTE TO FLAG A POST ---
router.put('/:id/flag', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { flagged: true },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post has been flagged for review.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;