const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authoraztion token required." });
  }

  const token = authorization.split(" ")[1]; //Cut the "bearer and return the token string"

  try {
    //Check the token sent back from the frontend and verify with the secret, it will return the payload and we can grab the id
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id"); //will only return the id, also I'm attaching the user property to req
    //When the next function runs the req object in my controller files will have access to this req.user which is the id

    next(); //thank u next, thank u next, do you know the song? :D
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;
