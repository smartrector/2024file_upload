const {Router} = require("express");
const imageRouter = Router();
const {upload} = require("../middlewares/imageUpload");
const {Image} = require("../models/Image");

imageRouter.post("/", upload.single("imageTest"), async function (req, res) {
  try {
    console.log(req.file);
    // const {title} = req.body
    const image = await new Image({
      filename: req.file.filename,
      originalFileName: req.file.originalname,
      title: req.body.title,
    }).save();

    return res.send({image});
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
});

module.exports = {imageRouter};
