const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
const moodRoutes = require('./routes/moodRoutes');
app.use('/api/mood', moodRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes Example (Test Route)
app.get("/", (req, res) => {
  res.send("Welcome to MoodMate Backend 🚀");
});

// Serve frontend from the backend
const frontendPath = path.join(__dirname, "../frontend/build/index.html");

app.use(express.static(frontendPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

app.use(cors({
  origin: true , // ✅ or your deployed frontend URL later
  credentials: true,
}));
