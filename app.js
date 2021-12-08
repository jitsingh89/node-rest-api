const express = require("express");
const server = express();
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const HttpError = require("./models/http-error");

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Server Started on PORT 3000");
});

server.use("/api/users", userRoutes);

server.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

server.listen(3000, () => {
  console.log("Server Started !!!!");
});
