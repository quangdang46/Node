const express = require("express");
const ehs = require("express-handlebars");
const { calc, moveFile } = require("./helpers/lib");
var multiparty = require("multiparty");
const fs = require("fs");

const app = express();
app.engine(
  "handlebars",
  ehs.engine({
    defaultLayout: "main",
  })
);

app.use(express.static("public"));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const files = fs.readdirSync("./public/images");
  res.render("home", { files });
});

app.get("/tinhtoan1", (req, res) => res.render("form1"));
app.get("/tinhtoan2", (req, res) => res.render("form2"));

app.post("/tinhtoan1", (req, res) => {
  const { a, b, op } = req.body;
  const result = calc(+a, +b, op);
  res.render("form1", { result });
});

app.post("/tinhtoan2", (req, res) => {
  const { a, b, op } = req.body;
  const result = calc(+a, +b, op);
  res.json({ result });
});

app.get("/upload-images", (req, res) => {
  res.render("upload");
});

app.post("/upload-images", async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    // success file
    const photos = files.photo;
    // move file to public/images
    const promises = photos.map((photo) => {
      const oldPath = photo.path;
      const newPath = "./public/images/" + Date.now() + photo.originalFilename;
      return moveFile(oldPath, newPath);
    });
    const result = photos.map((photo) => {
      return {
        name: photo.originalFilename,
        status: photo.path ? "success" : "fail",
      };
    });
    Promise.all(promises)
      .then(() => {
        res.render("upload", { result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.listen(8080, () => {
  console.log("running");
});
