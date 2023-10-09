const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const form = require("express-form");
const bodyParser = require("./bodyParser/bodyParser");
const field = form.field;
const ehbs = require("express-handlebars");

const app = express();

app.use(cors());
app.use(bodyParser);
const hbs = ehbs.create({
  defaultLayout: "main",
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.post("/", (req, res) => {
  //   res.render("index");
  res.json(req.data);
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
