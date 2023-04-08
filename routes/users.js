const express = require("express");

const {
  getAllUsers,
  getSingleUser,
  followFriend,
  unFollowFriend,
} = require("../controllers/usersController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
//This will check for the token sent back from the frontend
//If auth is valid, it will attach the id in the req.user so the controllers below have access to it
//Check the requireAuth for more comments
router.use(requireAuth);

//Get all users
router.get("/allusers", getAllUsers);

//Get a single user
router.get("/allusers/:userId", getSingleUser);

router.patch("/allusers/:userId", followFriend);
router.patch("/allusers/unfollow/:userId", unFollowFriend);

module.exports = router;
