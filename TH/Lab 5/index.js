require("dotenv").config();
const URL = process.env.URL;
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const form = require("express-form");
const bodyParser = require("./bodyParser/bodyParser");
const field = form.field;
const ehbs = require("express-handlebars");
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 4,
  message: "You have exceeded the rate limit.",
});

const app = express();

app.use(cors());
app.use(bodyParser);
const hbs = ehbs.create({
  defaultLayout: "main",
  helpers: {
    getLength: function (array) {
      return array.length;
    },
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// app.use("/", apiLimiter);

app.get("/", (req, res) => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      req.data = data;
      res.render("index", { students: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  fetch(`${URL}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.render("profile", { student: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post(
  // route
  "/add",
  // form filter and validation middleware
  // form(
  //   field("fullName").trim(),
  //   field("gender").trim(),
  //   field("age").trim(),
  //   field("email").trim()
  // ),
  (req, res) => {
    // if (!req.form.isValid) {
    //   console.log(req.form.errors);
    // } else {
    //   console.log(req.form);
    // }

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.data),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

// 404
app.use((req, res) => {
  res.status(404);
  res.render("error");
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
