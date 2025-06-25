const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (CORS must be first!)
app.use(cors({
  origin: true, // Allow all origins for now
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (move this up before routes)
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes (these must come BEFORE static file serving)
const authRoutes = require("./routes/authRoutes");
const moodRoutes = require('./routes/moodRoutes');

app.use("/api/auth", authRoutes);
app.use('/api/mood', moodRoutes);

// Test API endpoint (optional - for debugging)
app.get("/api/test", (req, res) => {
  res.json({ message: "Welcome to MoodMate Backend 🚀", status: "working" });
});

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all handler: send React app for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});