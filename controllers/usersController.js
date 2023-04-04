const User = require("../models/userModel");

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get a single user by Id
const getSingleUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const user = await User.signup(email, password, first_name, last_name);
    const token = createToken(user._id); //Create token based on user's id
    res.status(200).json({ email, token }); //Send email and token as response, this will be the payload, secret, and sign thingy in a hash
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
};
