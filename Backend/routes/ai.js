// ai.js
const express = require("express");
const router = express.Router();
const OpenAI = require("openai"); // Correct import for v4+
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API Error:", err);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

module.exports = router;
