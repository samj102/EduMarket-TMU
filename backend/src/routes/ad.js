const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  onError: function (err, next) {
    console.log("error", err);
    next(err.code, err.message);
  },
});

const {
  authenticateOwnerToken,
  authenticateUserToken,
} = require("../middleware");
const postModel = require("../models/postModel");

//To get the images uploaded by the user for the ads
router.get("/uploads/:file", (req, res) => {
  res.sendFile(path.join(__dirname, `../../uploads/${req.params.file}`));
});

//To add a new post in the database
router.post(
  "/",
  authenticateUserToken,
  upload.array("image", 20),
  async function (req, res, next) {
    try {
      const { title, description, post_person_id, price, category } = req.body;
      const uploadedImages = [];
      console.log(req.files);
      for (const image of req.files) {
        uploadedImages.push(image.path);
      }
      const newPost = new postModel({
        title: title,
        description: description,
        image: uploadedImages,
        post_person_id: post_person_id,
        price: price,
        category: category,
      });
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      next(createError(500, error.message));
    }
  }
);

//To update an ad in the database
router.put(
  "/:id/:post_person_id",
  authenticateOwnerToken,
  upload.array("image", 20),
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, price, category } = req.body;

      const uploadedImages = [];
      for (const image of req.files) {
        uploadedImages.push(image.path);
      }

      // Delete the old images
      const oldpost = await postModel.findById(id);
      for (const image of oldpost.image) {
        if (uploadedImages.includes(image) === false) {
          fs.unlinkSync(image);
        }
      }
      const post = await postModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: uploadedImages,
        price: price,
        category: category,
      });
      res.status(200).json(post);
    } catch (error) {
      if (error.kind === "ObjectId") {
        next(createError(404, "User not found"));
      } else {
        next(createError(500, "Failed attempt"));
      }
    }
  }
);

//To get all the ads from the database
router.get("/", authenticateUserToken, async function (req, res, next) {
  try {
    const posts = await postModel.find({});
    res.status(200).json(posts);
  } catch (error) {
    next(createError(500, error.message));
  }
});

//To delete an ad from the database
router.delete(
  "/:id/:post_person_id",
  authenticateOwnerToken,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id);
      for (const image of post.image) {
        fs.unlinkSync(image);
      }
      await postModel.deleteOne({ _id: id });
      res.sendStatus(200);
    } catch (error) {
      if (error.kind === "ObjectId") {
        next(createError(404, "User not found"));
      } else {
        next(createError(500, "Failed attempt"));
      }
    }
  }
);

module.exports = router;
