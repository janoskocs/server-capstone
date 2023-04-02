const Moment = require("../models/MomentModel");

//GET all moments

//GET a single moment

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
};
