const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");
const protect = require("../middleware/authMiddleware");


// POST route to add mood
router.post("/add", protect, async (req, res) => {
  try {
    const { mood, moodEmoji, intensity, notes, date } = req.body;

     if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    console.log("📥 Body:", req.body);
    console.log("👤 User:", req.user);

    const newMood = new Mood({
      mood,
      moodEmoji,
      intensity,
      notes,
      date,
      user: req.user._id,
    });

    await newMood.save();

    res.status(201).json({ message: "Mood added successfully!" });
  } catch (error) {
    console.error("Error adding mood:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ GET route → to fetch all moods
router.get("/", protect, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUT route → to update a mood by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params; // mood ID from URL
    const cleanId = id.trim(); 
    const { mood, description, date } = req.body; // new data from frontend/Postman

    const updatedMood = await Mood.findByIdAndUpdate(
      id,
      { mood, description, date },
      { new: true } // returns the updated document
    );

    if (!updatedMood) {
      return res.status(404).json({ message: "Mood not found!" });
    }

    res.status(200).json(updatedMood);
  } catch (error) {
    console.error("Error updating mood:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE route → to delete a mood by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMood = await Mood.findByIdAndDelete(id);

    if (!deletedMood) {
      return res.status(404).json({ message: "Mood not found!" });
    }

    res.status(200).json({ message: "Mood deleted successfully!" });
  } catch (error) {
    console.error("Error deleting mood:", error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
