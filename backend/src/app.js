const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { authRouter } = require("./routes/auth");
const connectDB = require("../config/db");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(logger("dev")); //logs requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/auth", authRouter);
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
