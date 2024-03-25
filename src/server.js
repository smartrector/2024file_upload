const express = require("express");
const {default: mongoose} = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");
const {v4: uuid} = require("uuid");
const mime = require("mime-types");

//01st
// const upload = multer({dest: "uploads"});

//02st
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "." + mime.extension(file.mimetype));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    //   cb(null, true);
    // } else {
    //   cb(new Error("png만 업로드가능 "), false);
    // }

    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("jpg/png 이미지만 업로드가능 "), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

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
