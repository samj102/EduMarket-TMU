const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  name_of_post_person : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["academic services", "items wanted", "items for sale"],
    required: true,
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

