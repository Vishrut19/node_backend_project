const express = require("express");
// const passport = require("./passportConfig");
const middlewares = require("./middleware");
require("dotenv/config");
require("./db.js");

const app = express();

middlewares(app);

// Import routes
const authRoutes = require("./routes/authRoutes");
const answerRoutes = require("./routes/answerRoutes");
const questionRoutes = require("./routes/questionRoutes");

// Use the routes
app.use("/auth", authRoutes); // This will have signup, login, username and logout
app.use("/answers", answerRoutes); // This will have submit
app.use("/questions", questionRoutes); // This will have get question by ID, get all questions, and send question

// Listening
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`);
});
