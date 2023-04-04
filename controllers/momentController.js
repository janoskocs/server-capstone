const Moment = require("../models/MomentModel");
const mongoose = require("mongoose");

//GET all moments
const getAllMoments = async (req, res) => {
  const user_id = req.user._id; //This is from the requireAuth middleware

  const moments = await Moment.find({ user_id }).sort({ createdAt: -1 }); //Get moments based on user id from DB and sort them in descending order. knex what? knex who?

  res.status(200).json(moments);
};

//GET a single moment
const getMoment = async (req, res) => {
  const { momentId } = req.params;

  //Check if the id we have is valid, Mongoose has this built in to check if the id is 12 chars
  if (!mongoose.Types.ObjectId.isValid(momentId)) {
    return res.status(404).json({
      error: "Invalid id.",
    });
  }
  const moment = await Moment.findById(momentId);

  //If the id is valid, check again if we have this moment saved
  if (!moment) {
    return res.status(404).json({
      error: "This moment doesn't exist in the history of humankind.",
    });
  }

  res.status(200).json(moment);
};

//POST new moment
const createMoment = async (req, res) => {
  const { title, content, mood } = req.body;

  //Add document to DB
  try {
    const user_id = req.user._id; // This is from the requireAuth middleware
    const moment = await Moment.create({
      title,
      content,
      mood,
      user_id,
    });
    res.status(201).json(moment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a moment

const deleteMoment = async (req, res) => {
  const { momentId } = req.params;

  //Check if the id we have is valid, Mongoose has this built in to check if the id is 12 chars
  if (!mongoose.Types.ObjectId.isValid(momentId)) {
    return res.status(404).json({
      error: "Invalid id.",
    });
  }

  const moment = await Moment.findOneAndDelete({ _id: momentId }); //MongoDB has this _id by default

  if (!moment) {
    return res.status(404).json({
      error: "This moment doesn't exist in the history of humankind.",
    });
  }

  res.status(200).json(moment);
};

//PATCH a moment
const updateMoment = async (req, res) => {
  const { momentId } = req.params;

  //Check if the id we have is valid, Mongoose has this built in to check if the id is 12 chars
  if (!mongoose.Types.ObjectId.isValid(momentId)) {
    return res.status(404).json({
      error: "Invalid id.",
    });
  }

  const moment = await Moment.findOneAndUpdate(
    { _id: momentId },
    {
      ...req.body,
    }
    //Any properties on the body will be passed as an arg to update moment
  );
  if (!moment) {
    return res.status(404).json({
      error: "This moment doesn't exist in the history of humankind.",
    });
  }

  res.status(200).json(moment);
};

//Appreciate a moment
const appreciateMoment = async (req, res) => {
  const { momentId } = req.params;
  const { friend_id } = req.body;

  try {
    const update = await Moment.appreciateMoment(momentId, friend_id);
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMoment,
  getAllMoments,
  getMoment,
  updateMoment,
  deleteMoment,
  appreciateMoment,
};
