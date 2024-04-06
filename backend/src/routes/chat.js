const express = require("express");
const createError = require("http-errors");
const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");
const router = express.Router();
const { authenticateUserToken } = require("../middleware");

router.post("/", authenticateUserToken, async (req, res, next) => {
  const { sender, receiver, message } = req.body;
  const newMessage = {
    sender,
    message,
  };
  try {
    const newChat = new chatModel({
      user_a: sender,
      user_b: receiver,
      messages: [newMessage],
    });
    const chat = await newChat.save();
    await userModel.findByIdAndUpdate(sender, {
      $push: { chats: chat._id },
    });
    await userModel.findByIdAndUpdate(receiver, {
      $push: { chats: chat._id },
    });
    res.status(200).json(chat);
  } catch (e) {
    next(createError(500, e.message));
  }
});

router.get("/:id", authenticateUserToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const chat = await chatModel.findById(id).populate("user_a user_b");
    res.status(200).json(chat);
  } catch (e) {
    next(createError(500, e.message));
  }
});

/**
 * Retrieves chat messages between two users based on their IDs.
 *
 * @param {string} user_id1 - The ID of the first user.
 * @param {string} user_id2 - The ID of the second user.
 * @returns {Promise<ChatMessage[]>} The array of chat messages between the two users.
 */
router.get(
  "/:user_id1/:user_id2",
  authenticateUserToken,
  async (req, res, next) => {
    const { user_id1, user_id2 } = req.params;
    try {
      const chat = await chatModel.find({
        $or: [
          { user_a: user_id1, user_b: user_id2 },
          { user_a: user_id2, user_b: user_id1 },
        ],
      });
      res.status(200).json(chat);
    } catch (e) {
      next(createError(500, e.message));
    }
  }
);

router.put("/:id", authenticateUserToken, async (req, res, next) => {
  const { id } = req.params;
  const { sender, message } = req.body;
  const newMessage = {
    sender,
    message,
  };
  try {
    const oldChat = await chatModel.findById(id);
    const newChat = await chatModel.findByIdAndUpdate(id, {
      messages: [...oldChat.messages, newMessage],
    });
    res.status(200).json(newChat);
  } catch (e) {
    next(createError(500, e.message));
  }
});

router.delete("/:id", authenticateUserToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const chat = await chatModel.findByIdAndDelete(id);
    await userModel.updateMany({}, { $pull: { chats: id } });
    res.sendStatus(204);
  } catch (e) {
    next(createError(500, e.message));
  }
});

module.exports = router;
