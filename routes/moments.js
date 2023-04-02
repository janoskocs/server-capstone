const express = require("express");
const { createMoment } = require("../controllers/momentController");
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
router.post("/", createMoment);

//Delete a moment
router.delete("/:momentId", (req, res) => {
  res.json({ message: "Delete a moment" });
});

//Update a moment
router.patch("/:momentId", (req, res) => {
  res.json({ message: "Update a moment" });
});

module.exports = router;
