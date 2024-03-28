const express = require("express");
const userModel = require("../models/postModel");
const router = express.Router();
const createError = require("http-errors");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
const upload = multer({ storage: storage });
const {
  authenticateAdminToken,
  authenticateOwnerToken,
  authenticateUserToken
} = require("../middleware");
const postModel = require("../models/postModel");


//To add a new post in the database
router.post("/",upload.single('image'),async function (req, res, next) {
  try {
    const newPost = new postModel({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        name_of_post_person: req.body.name_of_post_person,
        price: req.body.price,
        category: req.body.category
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(createError(500, error.message));
  }
});

//To update an ad in the database
router.put("/:id",async function (req, res, next) {
      try {
        const { id } = req.params;
        const { title, description, image, name_of_post_person, price, category } = req.body;
  
        const post = await postModel.findByIdAndUpdate(id, {
            title: title,
            description: description,
            image: image,
            name_of_post_person: name_of_post_person,
            price: price,
            category: category
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

//To delete an ad from the database
router.delete("/:id",async function (req, res, next) {
      try {
        const { id } = req.params;
        const post = await userModel.findByIdAndDelete(id);
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

module.exports = router;