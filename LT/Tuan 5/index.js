require("dotenv").config();
const PASS = process.env.PASS;
const express = require("express");
const ehbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Student = require("./models/student.model");

const app = express();
app.use(cors());

const uri = `mongodb+srv://tranquangdang21:${PASS}@cluster0.oobfvcm.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
};

connectDB();
app.engine(
  "handlebars",
  ehbs.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use(require("express-session")());

app.use(function (req, res, next) {
  res.locals.session = req.session.flash;
  delete req.session.flash;
  next();
});

app.get("/list", async (req, res) => {
  const listStudent = await Student.find();
  console.log(listStudent);
  res.render("list", {
    listStudent,
  });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.redirect("/list");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
