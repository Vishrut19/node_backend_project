const express = require("express");
const router = express.Router();
const Answers = require("../models/Answers");
const { isAuthenticated } = require("../middleware");

// Submit answers
router.post("/submit", isAuthenticated, async (req, res) => {
  const { questionId, selectedOption } = req.body;

  // Optional: Verify if the given option is valid for the question

  const answer = {
    user: req.user._id,
    question: questionId,
    selectedOption,
  };

  try {
    const createdAnswer = await Answers.create(answer);
    res.json(createdAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
