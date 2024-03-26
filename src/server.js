const express = require("express");
const {default: mongoose} = require("mongoose");
const app = express();
const dotenv = require("dotenv");

const {imageRouter} = require("./routes/imageRouter");

dotenv.config();

//app.use( express.static("uploads"));
//http://localhost:3000/abc.jpeg
app.use("/hanyong5", express.static("uploads"));
//http://localhost:3000/uploads/abc.jpeg

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db연결됨");
    app.use(express.json());

    app.use("/upload", imageRouter);

    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
server();
