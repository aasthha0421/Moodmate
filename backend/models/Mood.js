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
    ref: "User",
    default: Date.now,
  },
});

const Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;
