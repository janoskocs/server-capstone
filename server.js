require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const momentsRoutes = require("./routes/moments");

//Express app
const app = express();

//Middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/moments", momentsRoutes);

//Connect to DB first, then start listening for requests
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
