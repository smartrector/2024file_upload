const {Router} = require("express");
const imageRouter = Router();
const {upload} = require("../middlewares/imageUpload");
const {Image} = require("../models/Image");

imageRouter.post("/", upload.array("images", 5), async function (req, res) {
  try {
    // console.log(req.files);
    // const {title} = req.body

    //sigle file
    // const image = await new Image({
    //   filename: req.file.filename,
    //   originalFileName: req.file.originalname,
    //   title: req.body.title,
    // }).save();

    // return res.send({image});

    // multi file
    const {title, content} = req.body;
    const images = [];
    req.files.forEach(function (item) {
      images.push({
        filename: item.filename,
        originalname: item.originalname,
      });
    });

    const image = await new Image({
      // title:title,content:content,images:images
      ...req.body,
      images,
    }).save();
    return res.send({image});
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
});

module.exports = {imageRouter};
