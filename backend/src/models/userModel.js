const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
