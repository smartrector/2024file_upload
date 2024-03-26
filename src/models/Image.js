const {default: mongoose} = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    content: {type: String, required: true},
    images: [{filename: String, originalname: String}],
  },
  {timestamps: true}
);
const Image = mongoose.model("image", ImageSchema);
module.exports = {Image};
