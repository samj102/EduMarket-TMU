const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const userModel = require("../models/userModel");

const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALGORITHM;

function hashPassword(password) {
  const saltRounds = 10;
  try {
    return bcrypt.hashSync(password, saltRounds);
  } catch (err) {
    throw err;
  }
}

function authenticateUserToken(req, res, next) {
  const token = req.cookies["access_token"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err) => {
    if (err) return next(createError(403));
    next();
  });
}

function authenticateAdminToken(req, res, next) {
  const token = req.cookies["access_token"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(createError(403));
    if (user.role !== "admin") return next(createError(403));
    next();
  });
}

function generateToken(data) {
  return jwt.sign(data, secretKey, {
    algorithm: algorithm,
    // expiresIn: "1h",
  });
}

router.post("/register", async function (req, res, next) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = hashPassword(password);
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = generateToken({ email: email, role: "student" });
      res.status(200).json({ token });
    } else {
      next(createError(409, "User already exists"));
    }
  } catch (err) {
    next(createError(500, err.message));
  }
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    next(createError(401, "Authentication failed"));
  } else {
    const userdata = {
      email: email,
      role: user.role,
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
  }
});

module.exports = {
  authRouter: router,
  authenticateAdminToken: authenticateAdminToken,
  authenticateUserToken: authenticateUserToken,
};
