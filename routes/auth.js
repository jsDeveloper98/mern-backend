const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// /auth/signup
router.post(
  "/signup",
  [
    check("email", "Wrong email").normalizeEmail().isEmail(),
    check("password", "Wrong password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
        message: "Wrong data for register",
      });
    }

    const { email, password } = req.body;

    const dublicateEmail = await User.findOne({ email });
    if (dublicateEmail) {
      return res.status(400).json({ message: "Such user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    user
      .save()
      .then(() => res.json({ message: "User successfully created" }))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
);

// /auth/signin
router.post(
  "/signin",

  [
    check("email", "Enter valid email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
        message: "Wrong data for login",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const userId = user.id;

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });

    res.json({ token, userId });
  }
);

module.exports = router;
