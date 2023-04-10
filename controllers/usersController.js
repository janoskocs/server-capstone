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

//Search for users
const searchForUsers = async (req, res) => {
  const { searchInput } = req.body;

  // create a regular expression to match the search input
  const regex = new RegExp(searchInput, "i");

  try {
    const searchResults = await User.find(
      {
        $or: [{ first_name: regex }, { last_name: regex }, { email: regex }],
      },
      {
        first_name: 1,
        last_name: 1,
        email: 1,
        avatar: 1,
        _id: 1,
      }
    );
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get shortened versions of people user follows
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

//Get shortened versions of followers
const getFollowersShortened = async (req, res) => {
  const user_id = req.user._id;

  try {
    const users = await User.find({ _id: user_id }).sort({ createdAt: -1 });
    const ids = users[0].followers.map((id) => id.follower_id);
    const details = await User.find(
      { _id: { $in: [...ids] } },
      { first_name: 1, last_name: 1, email: 1, avatar: 1 }
    );

    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get shortened version of user by ID
const getShortenedUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.find(
      { _id: userId },
      { first_name: 1, last_name: 1, email: 1, avatar: 1 }
    ).sort({ createdAt: -1 });

    res.status(200).json(user);
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
  getShortenedUserById,
  searchForUsers,
  getFollowersShortened,
};
