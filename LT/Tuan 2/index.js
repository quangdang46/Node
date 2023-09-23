const express = require("express");
const app = express();
const ehbs = require("express-handlebars");

app.engine("handlebars", ehbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("home"));
var tours = [
  { id: 0, name: "item 1", price: 1 },
  { id: 1, name: "item 2", price: 2 },
  { id: 2, name: "item 3", price: 3 },
  { id: 3, name: "item 4", price: 4 },
  { id: 4, name: "item 5", price: 5 },
  { id: 5, name: "item 6", price: 6 },
  { id: 6, name: "item 7", price: 7 },
  { id: 7, name: "item 8", price: 8 },
  { id: 8, name: "item 9", price: 9 },
  { id: 9, name: "item 10", price: 10 },
];
// Thêm phần tử vào mảng
app.post("/tours/:id/:name/:price", (req, res) => {
  const { id, name, price } = req.params;

  const tour = tours.find((tour) => tour.id === id);
  if (tour) {
    return res.status(404).json({ error: "Tour has exist" });
  }

  tours.push({
    id,
    name,
    price,
  });

  res.json({ Success: "Tour has been add" });
});

//render trang tours
app.get("/tours", (req, res) => {
  console.log(error);
  res.render("tours", { tours: tours });
});
// Tìm kiếm phần tử
app.get("/tours/:id", (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({ error: "Tour not found" });
  }

  res.json(tour);
});
app.listen(8080, () => console.log("running"));
