const express = require("express");

const {
  getAllUsers,
  getSingleUser,
  followFriend,
  unFollowFriend,
  getShortenedSpecificUsers,
  getShortenedUserById,
  searchForUsers,
  getFollowersShortened,
} = require("../controllers/usersController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
//This will check for the token sent back from the frontend
//If auth is valid, it will attach the id in the req.user so the controllers below have access to it
//Check the requireAuth for more comments
router.use(requireAuth);

//Get all users
router.get("/allusers", getAllUsers);

//Search for users
router.post("/allusers/search", searchForUsers);

//Get shortened specific users
router.get("/allusers/shortened", getShortenedSpecificUsers);

//Get followers of user
router.get("/allusers/shortened/myfollowers", getFollowersShortened);

//Get shortened user by Id
router.get("/allusers/shortened/:userId", getShortenedUserById);

//Get a single user
router.get("/allusers/:userId", getSingleUser);

//Follow someone
router.patch("/allusers/:userId", followFriend);

//Unfollow someone
router.patch("/allusers/unfollow/:userId", unFollowFriend);

module.exports = router;
