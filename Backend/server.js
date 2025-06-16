const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/ai");
const authRoutes = require("./routes/auth"); // Import auth.js

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow frontend requests

// Use auth routes with a prefix
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes); // Add this line to register /ai/ask

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.error("MongoDB Connection Error ❌:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
