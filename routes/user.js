const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");
const router = express.Router();

//Log in route
router.post("/login", loginUser);

//Sign up route
router.post("/signup", signupUser);

module.exports = router;
