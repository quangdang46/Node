require("dotenv").config();
const PASS = process.env.PASS;

const express = require("express");
const ehbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
// models
const { User, Photo } = require("./models/Collection.model");
const e = require("express");

const app = express();

const uri = `mongodb+srv://tranquangdang21:${PASS}@uploadphotos.lk4lkz9.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

const hbs = ehbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.redirect("/");
  }
  next();
};

// routes

app.get("/", (req, res) => {
  res.render("home");
});

// app.get("/login", checkLogin, (req, res) => {
//   res.render("login");
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user.password);
  if (user && user.password === password) {
    req.session.user = user;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

app.get("/uploads", async (req, res) => {
  res.render("uploads"); 
});

app.listen(8080, () => {
  console.log("Server is listening on port 3000");
});
