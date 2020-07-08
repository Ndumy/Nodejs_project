const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");

// get Profiles route
router.get("/profile", async (req, res) => {
  const id = req.params._id;
  User.find({})
    .then((data) => {
      const status = res.statusCode;
      res.status(200).json({
        status,
        data,
      });
    })
    .catch((err) => {
      res.json({
        status,
        err,
      });
    });
});

// get single Profile route
router.post("/profile/:id", async (req, res) => {
  const id = req.params._id;
  User.findOne({ id })
    .then((data) => {
      const status = res.statusCode;
      res.status(200).json({
        status,
        data,
      });
    })
    .catch((err) => {
      res.json({
        status,
        err,
      });
    });
});

// Delete Profile routes
router.delete("/delete-profile/:id", async (req, res) => {
  const id = req.params._id;
  User.findOneAndRemove({ id })
    .then((data) => {
      const status = res.statusCode;
      res.status(200).json({
        status,
        data,
      });
    })
    .catch((err) => {
      res.json({
        status,
        err,
      });
    });
});

// Update Profile route
router.put("/update-profile/:id", async (req, res) => {
  const id = req.params._id;

  const status = res.statusCode;
  User.findOneAndUpdate({ id }, req.body)
    .then((data) => {
      res.status(200).json({
        status,
        data,
      });
    })
    .catch((err) => {
      res.json({
        status,
        err,
      });
    });
});

module.exports = router;
