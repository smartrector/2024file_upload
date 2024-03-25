const express = require("express");
const {default: mongoose} = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");

const upload = multer({dest: "uploads"});

dotenv.config();

//app.use( express.static("uploads"));
//http://localhost:3000/abc.jpeg
app.use("/uploads", express.static("uploads"));
//http://localhost:3000/uploads/abc.jpeg

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db연결됨");
    app.use(express.json());

    app.post("/upload", upload.single("image"), async function (req, res) {
      try {
        console.log(req.file);
        return res.send(req.file);
      } catch (error) {
        return res.status(500).send({error: error.message});
      }
    });

    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
server();
