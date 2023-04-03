const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Static sign up method

userSchema.statics.signup = async function (email, password) {
  //it must be a regular function so that the this keyword can do its job
  //Check if email exists in DB, if so throw an error
  const emailExists = await this.findOne({ email }); //this refers to User
  if (emailExists) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(15); //spicy, 15 is my fave number
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
