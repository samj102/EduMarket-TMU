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
  user_type: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  address: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
