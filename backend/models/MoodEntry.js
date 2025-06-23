const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});

const MoodEntry = mongoose.model('MoodEntry', MoodEntrySchema);
module.exports = MoodEntry;
