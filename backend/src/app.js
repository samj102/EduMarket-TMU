const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const adRouter = require("./routes/ad");
const connectDB = require("../config/db");

const app = express();

// load environment variables
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
// middlewares
app.use(cors(corsOptions));
app.use(logger("dev")); //logs requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//To get the images uploaded by the user for the ads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/ad", adRouter);
connectDB();

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
