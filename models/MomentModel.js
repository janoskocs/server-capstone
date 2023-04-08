const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Set up document and its Schema
//Mood schema
const moodSchema = new Schema({
  positive: Number,
  negative: Number,
  middle: Number,
});

const momentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    mood: moodSchema,
    user_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    appreciatedBy: [
      {
        friend_id: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true } //Whenever a new doc is created/updated, auto add timestamp
);

//Appreciate a moment
momentSchema.statics.appreciateMoment = async function (_id, friend_id) {
  //Check if the id we have is valid, Mongoose has this built in to check if the id is 12 chars
  if (!mongoose.Types.ObjectId.isValid(friend_id)) {
    return res.status(404).json({
      error: "Invalid friend ID.",
    });
  }

  const appreciatedMoment = await this.updateOne(
    { _id: _id }, //Moment Id
    {
      $push: {
        appreciatedBy: {
          $each: [{ friend_id: friend_id, createdAt: new Date() }],
        },
      },
    }
  );

  return appreciatedMoment;
};
module.exports = mongoose.model("Moment", momentSchema); //MongoDB auto pluralises the collection name :D fancy
