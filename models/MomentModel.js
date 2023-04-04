const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Set up document and its Schema
const momentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
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
