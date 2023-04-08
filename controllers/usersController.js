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

//Get all users
const getShortenedSpecificUsers = async (req, res) => {
  const user_id = req.user._id;

  try {
    const users = await User.find({ _id: user_id }).sort({ createdAt: -1 });
    const ids = users[0].peopleIfollow.map((id) => id.follower_id);
    const details = await User.find(
      { _id: { $in: [...ids] } },
      { first_name: 1, last_name: 1, email: 1, avatar: 1 }
    );

    res.status(200).json(details);
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

//Follow friend
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

//Unfollow friend
const unFollowFriend = async (req, res) => {
  const { userId } = req.params;
  const { follower_id } = req.body;

  try {
    const update = await User.unFollowFriend(userId, follower_id);
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  followFriend,
  unFollowFriend,
  getShortenedSpecificUsers,
};
