const express = require("express");
const Account = require("./Routes/Account");
const Products = require("./Routes/Products");
const Orders = require("./Routes/Orders");
const connectDb = require("./config/connect");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

connectDb();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("api/account", Account);
app.use("api/products", Products);
app.use("api/orders", Orders);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
