const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  likes: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false }, // ADDED THIS MISSING LINE
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);