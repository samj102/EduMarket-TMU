const express = require("express");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const router = express.Router();
const createError = require("http-errors");
const {
  authenticateAdminToken,
  authenticateOwnerToken,
} = require("../middleware");
const chatModel = require("../models/chatModel");

//To check all the users in the databse
router.get("/", authenticateAdminToken, async function (req, res, next) {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(createError(500, error.message));
  }
});

//View a user by id
router.get("/:id", authenticateOwnerToken, async function (req, res, next) {
  try {
    const { id } = req.params;
    const users = await userModel.findById(id);
    res.status(200).json(users);
  } catch (error) {
    if (error.kind === "ObjectId") {
      next(createError(404, "User not found"));
    } else {
      next(createError(500, error.message));
    }
  }
});

//Update a user
router.put(
  "/update/:id",
  authenticateOwnerToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      if (req.body.password) {
        next(createError(400, "Changing password is not allowed"));
      } else {
        const user = await userModel.findByIdAndUpdate(id, {
          name: name,
          email: email,
        });
        res.status(200).json(user);
      }
    } catch (error) {
      if (error.kind === "ObjectId") {
        next(createError(404, "User not found"));
      } else {
        next(createError(500, error.message));
      }
    }
  }
);

//Delete a user
router.delete(
  "/delete/:id",
  authenticateAdminToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      await postModel.deleteMany({ post_person_id: id });
      const chat = await chatModel.find({
        $or: [
          { user_a: user_id1, user_b: user_id2 },
          { user_a: user_id2, user_b: user_id1 },
        ],
      });
      for (const c of chat) {
        await chatModel.findByIdAndDelete(c._id);
        await userModel.findByIdAndUpdate(c.user_a, {
          $pull: { chats: c._id },
        });
      }

      const users = await userModel.findByIdAndDelete(id);
      res.status(200).json(users);
    } catch (error) {
      if (error.kind === "ObjectId") {
        next(createError(404, "User not found"));
      } else {
        next(createError(500, error.message));
      }
    }
  }
);

module.exports = router;
