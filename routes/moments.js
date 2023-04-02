const express = require("express");
const {
  createMoment,
  getAllMoments,
  getMoment,
} = require("../controllers/momentController");

const router = express.Router();

//Get all moments
router.get("/", getAllMoments);

//Get a single moment
router.get("/:momentId", getMoment);

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
