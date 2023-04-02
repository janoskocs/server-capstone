const express = require("express");

const Moment = require("../models/MomentModel");

const router = express.Router();

//Get all moments
router.get("/", (req, res) => {
  res.json({ message: "Get all moments" });
});

//Get a single moment
router.get("/:momentId", (req, res) => {
  res.json({ message: "Get a single moment" });
});

//Post a new moment
router.post("/", async (req, res) => {
  const { title, content, mood } = req.body;

  try {
    const moment = await Moment.create({
      title,
      content,
      mood,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
  res.json({ message: "Post a new moment" });
});

//Delete a moment
router.delete("/:momentId", (req, res) => {
  res.json({ message: "Delete a moment" });
});

//Update a moment
router.patch("/:momentId", (req, res) => {
  res.json({ message: "Update a moment" });
});

module.exports = router;
