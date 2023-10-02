require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8080;
const URL = process.env.URL;
const TOKEN = process.env.TOKEN;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const page = req.query.page || 1;
  const url = `${URL}/public-api/users?page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((_res) => {
      res.json(_res);
    });
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const url = `${URL}/public-api/users/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((_res) => {
      res.json(_res.data);
    });
});

app.post("/add", (req, res) => {
  const url = `${URL}/public-api/users`;
  const user = req.body;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((_res) => {
      console.log(_res);
      res.json(_res);
    });
});

app.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const url = `${URL}/public-api/users/${id}`;
  const user = req.body;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((_res) => {
      console.log(_res);
      res.json(_res);
    });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const url = `${URL}/public-api/users/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((_res) => {
      console.log(_res);
      res.json(_res);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
