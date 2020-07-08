const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");
const router = express.Router();
const User = mongoose.model("User");

// Register route
router.post("/register", async (req, res) => {
  const { email, password, name, mobile, dob } = req.body;
  const createdat = new Date().getTime();

  try {
    const user = new User({ email, password, name, mobile, dob, createdat });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password" });
  }
});

module.exports = router;
