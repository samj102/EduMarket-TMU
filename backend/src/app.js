const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const connectDB = require("../config/db");
const { authenticateUserToken } = require("./middleware");

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

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
connectDB();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
