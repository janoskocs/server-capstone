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
  const { userId } = req.params;
  try {
    const user = await User.find({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const followFriend = async (req, res) => {
  const { userId } = req.params;
  const { follower_id } = req.body;

  try {
    const update = await User.followFriend(userId, follower_id);
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  followFriend,
};
