const User = require("../models/userModel");
//User log in

const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

//User Sign up

const signupUser = async (req, res) => {
  res.json({ message: "Sign up user" });
};

module.exports = {
  loginUser,
  signupUser,
};
