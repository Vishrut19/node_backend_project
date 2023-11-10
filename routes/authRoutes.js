const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("../passportConfig");
const User = require("../models/User");
const { isAuthenticated } = require("../middleware");

// Signup
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();

    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json(info);

      req.logIn(user, async (err) => {
        if (err) return next(err);

        user.loggedIn = true;
        await user.save();
        res.json({ message: "Signup and login successful" });
      });
    })(req, res, next);
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch username
router.get("/username", isAuthenticated, (req, res) => {
  res.json({ message: req.user.username });
});

//Logout Route
router.get("/logout", isAuthenticated, async (req, res) => {
  req.user.loggedIn = false;
  await req.user.save();
  req.logOut((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out." });
    }
    res.json({ message: "Logout successful" });
  });
});

module.exports = router;
