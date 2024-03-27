const {User} = require("../models/User");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/reg", async function (req, res) {
  try {
    console.log(req.body);
    const user = await new User(req.body).save();
    return res.send({user});
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
});

module.exports = {userRouter};
