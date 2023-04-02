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
  },
  { timestamps: true } //Whenever a new doc is created/updated, auto add timestamp
);

module.exports = mongoose.model("Moment", momentSchema); //MongoDB auto pluralises the collection name :D fancy
