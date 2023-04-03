const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
  //This must be a regular function so that the this keyword can do its job

  //Validation

  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
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

//Static log in method

userSchema.statics.login = async function (email, password) {
  //Check if inputs are valid
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //Check if user exists in DB based on email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const comparePassword = await bcrypt.compare(password, user.password); //Compare input password and DB hash

  if (!comparePassword) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
