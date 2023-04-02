const express = require("express");
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
router.post("/", (req, res) => {
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
