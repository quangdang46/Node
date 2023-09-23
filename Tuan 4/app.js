const express = require("express");
const ehs = require("express-handlebars");

const app = express();
app.engine(
  "handlebars",
  ehs.engine({
    defaultLayout: "main",
    helpers: {},
  })
);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.render("form"));

app.listen(8080, () => {
  console.log("running");
});
