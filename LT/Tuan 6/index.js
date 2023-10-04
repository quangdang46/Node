require("dotenv").config();

const express = require("express");
const ehbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PASS = process.env.PASS;
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



// routes
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(8080, () => {
  console.log("Server is listening on port 3000");
});
