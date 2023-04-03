const User = require("../models/userModel");
//User log in

const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

//User Sign up

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
  res.json({ message: "Sign up user" });
};

module.exports = {
  loginUser,
  signupUser,
};
