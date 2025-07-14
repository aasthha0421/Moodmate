const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  moodEmoji: { 
    type: String,
   required: true }, 
  intensity: { 
    type: Number,
     required: true
   }, 
   notes: { type: String },
});

const Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;
