const express = require("express");
const router = express.Router();

const predefinedQA = {
  "hello": "Hewwo~ 👋 I'm your dreamy buddy! 🌙 How can I help? ✨",
  "what is dreamweave": "DreamWeave is your cozy place to log, view, and relive your dreams 💭💜",
  "how to add a dream": "Click the shiny 'Add Dream' button on your dashboard! I believe in you! 💪🌟",
  "bye": "Nyaa~ bye bye! Have the fluffiest dreams! 🐾🌙"
};

router.post("/ask", (req, res) => {
  const userQuestion = req.body.question?.toLowerCase().trim();

  if (!userQuestion) {
    return res.status(400).json({ answer: "Oops! You didn’t say anything... I got confused 🐣💤" });
  }

  const answer = predefinedQA[userQuestion] || randomCuteFallback();
  res.json({ answer });
});

function randomCuteFallback() {
  const fallbackReplies = [
    "Oops! I got sleepy for a moment 😴 Can you ask again?",
    "Hehe... I'm still learning! Try something else, please 🐰💕",
    "Hmm... that’s a mystery even to me! 🕵️‍♀️🌌",
    "My tiny bot brain didn’t get that 🤖💤",
    "Oopsies! I’m not sure yet, but I’ll grow smarter! 🌱✨"
  ];

  const randomIndex = Math.floor(Math.random() * fallbackReplies.length);
  return fallbackReplies[randomIndex];
}

module.exports = router;
