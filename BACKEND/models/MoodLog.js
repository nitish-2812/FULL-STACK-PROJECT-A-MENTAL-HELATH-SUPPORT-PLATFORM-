const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { 
    type: String, 
    enum: ['happy', 'good', 'neutral', 'bad', 'awful'], // Matches frontend emojis
    required: true 
  },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodLog', MoodLogSchema);
