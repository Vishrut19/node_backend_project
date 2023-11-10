const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passportConfig");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};
