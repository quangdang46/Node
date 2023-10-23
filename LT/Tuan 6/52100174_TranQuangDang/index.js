require("dotenv").config();
const PASS = process.env.PASS;

const express = require("express");
const ehbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");

// models
const { User, Photo } = require("./models/Collection.model");

const app = express();

const uri = `mongodb+srv://tranquangdang21:${PASS}@uploadphotos.lk4lkz9.mongodb.net/?retryWrites=true&w=majority`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
app.use(express.static("public"));

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
    next();
  }
};
// routes
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

app.get("/", checkLogin, (req, res) => {
  res.render("home");
});

app.get("/user-images", async (req, res) => {
  const user = req.session.user;

  if (!user) {
    res.redirect("/login");
    return;
  }

  try {
    const userWithPhotos = await User.findById(user._id).populate("photos");

    if (!userWithPhotos) {
      res.render("home", { message: "User not found" });
      return;
    }

    const userImages = userWithPhotos.photos.map((photo) => ({
      name: photo.name,
      url: photo.url,
    }));
    res.json({ userImages });
  } catch (error) {
    res.render("home", { message: "User not found" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
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

app.post("/uploads", upload.array("photos", 12), async (req, res) => {
  const photos = req.files;
  const user = req.session.user;
  const userDocument = await User.findById(user._id);

  if (!user) {
    res.redirect("/login");
    return;
  }

  try {
    const photoDocuments = await Promise.all(
      photos.map(async (photo) => {
        const newPhoto = new Photo({
          name: photo.originalname,
          url: `/uploads/${photo.filename}`,
          img: {
            data: photo.buffer,
            contentType: photo.mimetype,
          },
          user: user._id,
        });

        await newPhoto.save();

        userDocument.photos.push(newPhoto._id);
        await userDocument.save();

        return newPhoto;
      })
    );

    res.render("uploads", { message: "Upload successfully" });
  } catch (error) {
    res.render("uploads", { message: "Upload failed" });
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 3000");
});
