const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
  //1. payload nothing sensitive, 2. secret sauce, 3.expiry
};

//User log in
const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

//User Sign up
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id); //Create token based on user's id
    res.status(200).json({ email, token }); //Send email and token as response, this will be the payload, secret, and sign thingy in a hash
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  loginUser,
  signupUser,
};
