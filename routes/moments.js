const express = require("express");
const {
  createMoment,
  getAllMoments,
  getMoment,
  updateMoment,
  deleteMoment,
} = require("../controllers/momentController");

const router = express.Router();

//Get all moments
router.get("/", getAllMoments);

//Get a single moment
router.get("/:momentId", getMoment);

//Post a new moment
router.post("/", createMoment);

//Delete a moment
router.delete("/:momentId", deleteMoment);

//Update a moment
router.patch("/:momentId", updateMoment);

module.exports = router;
