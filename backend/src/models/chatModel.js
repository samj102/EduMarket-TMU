const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user_a: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  user_b: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
