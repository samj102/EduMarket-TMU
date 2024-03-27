const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name_of_post_person : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true,
  },
  price: {
    type: float,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

