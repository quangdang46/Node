var express = require("express");
const session = require("express-session");
var router = express.Router();
const connection = require("../models/connect");
const bcrypt = require("bcrypt");

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [username], function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        const response = bcrypt.compareSync(password, result[0].password);
        if (response) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/");
        } else {
          // res.send("Incorrect Password!");
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/");
        }

        // bcrypt.compare(password,result[0].password,function(err,response){
        //   console.log(response);
        // })
      } else {
        res.send("Username does not exist!");
      }
    });
  } catch (err) {
    console.error(err);
    res.send("An error occurred while logging in.");
  }
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;
  try {
    // validate password
    if (password !== repassword) {
      res.send("Passwords do not match!");
    }

    let sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [username], function (error, results) {
      if (error) throw error;
      if (results.length > 0) {
        res.send("That username is already in use!");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        console.log(passwordHash);
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        connection.query(sql, [username, passwordHash]);
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

router.get("/", function (req, res, next) {
  if (req.session.loggedin) {
    res.render("index");
  } else {
    res.send("Please login to view this page!");
  }
});

module.exports = router;
