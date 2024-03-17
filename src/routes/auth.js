const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const userModel = require("../models/userModel");

const router = express.Router();

function hashPassword(password) {
  const saltRounds = 10;
  try {
    return bcrypt.hashSync(password, saltRounds);
  } catch (err) {
    throw err;
  }
}

function authenticateToken(req, res, next) {
  const token = req.cookies["access_token"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) return next(createError(403));
    next();
  });
}

function generateToken(data) {
  secretKey = process.env.JWT_SECRET_KEY;
  algorithm = process.env.JWT_ALGORITHM;
  return jwt.sign(data, secretKey, {
    algorithm: algorithm,
    expiresIn: "1h",
  });
}

router.post("/register", async function (req, res, next) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = hashPassword(password);
    const userdata = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    const user = new userModel(userdata);
    await user.save();
    const token = generateToken(userdata);
    res.status(200).json({ token });
  } catch (err) {
    next(createError(500, err.message));
  }
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    next(createError(401, "Authentication failed"));
  }
  const userdata = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = generateToken(userdata);
      res.status(200).json({ token });
    } else {
      next(createError(401, "Incorrect Password"));
    }
  } catch (err) {
    next(createError(500, "Login failed"));
  }
});

module.exports = router;
