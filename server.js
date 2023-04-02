require("dotenv").config();
const express = require("express");
const momentsRoutes = require("./routes/moments");

//Express app
const app = express();

//Middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/moments", momentsRoutes);

//Listen for requests
app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000");
});
