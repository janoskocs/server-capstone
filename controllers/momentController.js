const Moment = require("../models/MomentModel");

//GET all moments
const getAllMoments = async (req, res) => {
  const moments = await Moment.find({}).sort({ createdAt: -1 }); //Get all moments from DB and sort them in descending order. knex what? knex who?

  res.status(200).json(moments);
};

//GET a single moment
const getMoment = async (req, res) => {
  const { momentId } = req.params;
  const moment = await Moment.findById(momentId);

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
    const moment = await Moment.create({
      title,
      content,
      mood,
    });
    res.status(201).json(moment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a moment

//PATCH a moment

module.exports = {
  createMoment,
  getAllMoments,
  getMoment,
};
