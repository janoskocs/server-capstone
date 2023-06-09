const Moment = require("../models/MomentModel");
const mongoose = require("mongoose");
const axios = require("axios");

//GET all moments based on who is logged in
const getAllMoments = async (req, res) => {
  const user_id = req.user._id; //This is from the requireAuth middleware

  const moments = await Moment.find({ user_id }).sort({ createdAt: -1 }); //Get moments based on user id from DB and sort them in descending order. knex what? knex who?

  res.status(200).json(moments);
};

const getAllMomentsMood = async (req, res) => {
  const user_id = req.user._id; //This is from the requireAuth middleware

  const moments = await Moment.find(
    { user_id },
    { "mood.positive": 1, "mood.negative": 1, "mood.middle": 1, _id: 0 }
  ).sort({
    createdAt: -1,
  }); //Get moments based on user id from DB and sort them in descending order. knex what? knex who?

  res.status(200).json(moments);
};

const getMomentsByUserId = async (req, res) => {
  const { userId } = req.params;

  const moments = await Moment.find({ user_id: userId }).sort({
    createdAt: -1,
  }); //Get moments based on user id from DB and sort them in descending order. knex what? knex who?

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
  const { content, image_url } = req.body;
  let mood = {
    positive: 0,
    negative: 0,
    middle: 0,
  };

  //Mood analysis score
  const encodedParams = new URLSearchParams();
  encodedParams.append("text", content);

  const options = {
    method: "POST",
    url: process.env.API_URL,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.API_RAPID_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
    data: encodedParams,
  };

  try {
    const { data } = await axios.request(options);
    mood = {
      positive: data.pos,
      negative: data.neg,
      middle: data.mid,
    };
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //Mood analyis score code ends

  //Add document to DB
  try {
    const user_id = req.user._id; // This is from the requireAuth middleware
    const moment = await Moment.create({
      content,
      mood,
      user_id,
      image_url,
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
  getMomentsByUserId,
  getAllMomentsMood,
};
