const express = require("express");
const {
  createMoment,
  getAllMoments,
  getMomentsByUserId,
  getMoment,
  updateMoment,
  deleteMoment,
  appreciateMoment,
  getAllMomentsMood,
} = require("../controllers/momentController");

const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

//This will check for the token sent back from the frontend
//If auth is valid, it will attach the id in the req.user so the controllers below have access to it
//Check the requireAuth for more comments
router.use(requireAuth);

//Get all moments
router.get("/", getAllMoments);

//Get users' moments mood
router.get("/mood", getAllMomentsMood);

//Get all moments by userId
router.get("/:userId", getMomentsByUserId);

//Get a single moment
router.get("/:momentId", getMoment);

//Post a new moment
router.post("/", createMoment);

//Delete a moment
router.delete("/:momentId", deleteMoment);

//Update a moment
router.patch("/:momentId", updateMoment);

//Appreciate a moment
router.patch("/appreciate/:momentId", appreciateMoment);

module.exports = router;
