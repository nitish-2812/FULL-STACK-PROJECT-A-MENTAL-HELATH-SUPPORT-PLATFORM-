const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['stress', 'anxiety', 'motivation', 'mindfulness', 'sleep', 'circles'],
    required: true
  },
  type: {
    type: String,
    enum: ['article', 'video', 'audio', 'quote'],
    required: true
  },
  link: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);