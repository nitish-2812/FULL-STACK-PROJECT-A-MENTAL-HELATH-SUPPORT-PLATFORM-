const express = require('express');
const MoodLog = require('../models/MoodLog');
const { authenticateToken } = require('../middleware/authMiddleware'); // FIXED LINE
const router = express.Router();

// GET mood logs for the logged-in user for the last 7 days
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moodLogs = await MoodLog.find({
      user: req.user.userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 'asc' });
    res.json(moodLogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new mood log
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { mood, note } = req.body;
        const newLog = new MoodLog({
            user: req.user.userId,
            mood,
            note
        });
        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;