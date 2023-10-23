var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lab6",
});

connection.connect();

module.exports = connection;
