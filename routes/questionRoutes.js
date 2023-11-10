const express = require("express");
const router = express.Router();
const Questions = require("../models/Questions");
const { isAuthenticated } = require("../middleware");

// Fetch a question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all questions
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const questions = await Questions.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a question
router.post("/sendquestion", isAuthenticated, async (req, res) => {
  const question = new Questions(req.body);
  try {
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
