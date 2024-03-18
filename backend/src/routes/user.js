const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const createError = require("http-errors");


//To check all the users in the databse
router.get("/view", async function (req, res, next){
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Update a user
router.put("/update/:id", async function (req, res, next){
    try {
        const {id} = req.params;
        const { name, email } = req.body;
        
        if (req.body.password){
            next(createError(400, "Changing password is not allowed"));
        }
        else{
            const user = await userModel.findByIdAndUpdate(id, {name:name, email:email});
            if (!user){
            next(createError(404).json({message: "User not found"}));
            }
            res.status(200).json(user);
        }
    } catch (error) {
        next(createError(500, "Failed attempt"));
    }
})

module.exports = router;