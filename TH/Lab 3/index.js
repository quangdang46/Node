const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();
const CryptoJS = require("crypto-js");
const PORT = process.env.PORT;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///Biến user này dùng để lưu thông tin đăng nhập
var user = null;

//Biến toàn cục chứa danh sách sản phẩm
var products = [
  { id: 1, name: "Product test 1", price: 30 },
  { id: 2, name: "Product test 2", price: 20 },
  { id: 3, name: "Product test 3", price: 10 },
  { id: 4, name: "Product test 4", price: 15 },
];

// Configure Handlebars view engine
app.engine(
  "handlebars",
  hbs.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

//Method GET route '/' Hiển thị giao diện
app.get("/", (req, res) => {
  //nếu người dùng chưa đăng nhập, thực hiện redirect về trang đăng nhập
  if (user === null) {
    res.redirect("/login");
  } else {
    res.render("home", { products: products });
  }
});

//Method GET route '/login' Hiển thị giao diện
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

//Method GET route '/add' Hiển thị giao diện
app.get("/add", (req, res) => {
  res.render("add", { error: null });
});

//Method POST route '/add'. Thực hiện thêm mới sản phẩm
app.post("/add", async (req, res) => {
  const { name, price } = req.body;
  if (name === "" || price === "" || price < 0 || isNaN(price)) {
    res.render("add", { error: "Name or price is empty", name, price });
  } else {
    const id = products.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
    products.push({ id, name, price });
    // flash message
    res.redirect("/");
  }
});

//Method POST route '/login'. Thực hiện đăng nhập và redirect về home
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== EMAIL || password !== PASSWORD) {
    res.render("login", {
      error: "Email or password is incorrect",
      email,
      password,
    });
  } else {
    user = { email, password };
    res.redirect("/");
  }
});

//Method GET route '/:id'. Lấy thông tin product theo số id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (product) {
    res.render("detail", { product });
  } else {
    res.render("404");
  }
});

// Route `/edit/:id`
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (product) {
    const encryptedId = CryptoJS.AES.encrypt(id, "secret").toString();
    res.render("edit", { ...product, encryptedId });
  } else {
    res.render("404");
  }
});

// Route `/edit`
app.post("/edit", (req, res) => {
  const encryptedId = req.body.id;

  // Giải mã id
  const id = CryptoJS.AES.decrypt(encryptedId, "secret").toString(
    CryptoJS.enc.Utf8
  );

  // Cập nhật sản phẩm
  const product = products.find((p) => p.id == id);
  product.name = req.body.name;
  product.price = req.body.price;

  // Lưu sản phẩm đã cập nhật
  products = products.map((p) => (p.id == id ? product : p));

  // Chuyển hướng đến trang sản phẩm
  res.redirect("/");
});
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (product) {
    const encryptedId = CryptoJS.AES.encrypt(id, "secret").toString();
    res.render("delete", { ...product, encryptedId });
  } else {
    res.render("404");
  }
});

app.post("/delete", (req, res) => {
  const encryptedId = req.body.id;
  const id = CryptoJS.AES.decrypt(encryptedId, "secret").toString(
    CryptoJS.enc.Utf8
  );

  // Xóa sản phẩm
  products = products.filter((p) => p.id != id);
  // Chuyển hướng đến trang sản phẩm
  res.redirect("/");
});

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});
// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(PORT, () =>
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; " +
      "press Ctrl-C to terminate. "
  )
);
