var http = require("http"),
  fs = require("fs"),
  url = require("url"),
  qs = require("querystring");

http
  .createServer(function (req, res) {
    var path = url.parse(req.url).pathname.replace(/\/$/, "").toLowerCase();
    switch (path) {
      case "":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync(__dirname + "/ex2.html", "utf-8"));
        break;
      case "/login":
        if (req.method === "GET") {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("Khong ho tro GET");
          break;
        }

        var postData = "";

        req.on("data", function (data) {
          postData += data;
        });

        req.on("end", function () {
          try {
            const { email, password } = qs.parse(postData);

            if (email === "admin" && password === "admin") {
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end("Dang nhap thanh cong");
            } else {
              res.writeHead(401, { "Content-Type": "text/plain" });
              res.end("Dang nhap that bai");
            }
          } catch (error) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid JSON data");
          }
        });
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Duong dan khong ton tai");
        break;
    }
  })
  .listen(8080);

console.log("Server started on localhost:8080; press Ctrl-C to terminate....");
