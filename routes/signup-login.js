const express = require("express");
const {
  loginUser,
  signupUser,
} = require("../controllers/userLogSignController");

const {
  getAllUsers,
  getSingleUser,
} = require("../controllers/usersController");
const router = express.Router();

//Log in route
router.post("/login", loginUser);

//Sign up route
router.post("/signup", signupUser);

module.exports = router;
