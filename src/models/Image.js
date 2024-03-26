const {default: mongoose} = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    filename: {type: String, required: true},
    originalFileName: {type: String, required: true},
  },
  {timestamps: true}
);
const Image = mongoose.model("image", ImageSchema);
module.exports = {Image};
