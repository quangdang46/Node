var http = require("http"),
  fs = require("fs"),
  url = require("url");

function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Error");
    } else {
      res.writeHead(responseCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

http
  .createServer(function (req, res) {
    var path = url.parse(req.url).pathname.replace(/\/$/, "").toLowerCase();
    switch (path) {
      case "":
        serveStaticFile(res, "/ex1.html", "text/html");
        break;
      case "/result":
        const { query } = url.parse(req.url, true);
        const calculate = (a, b, op) => {
          const parsedA = parseInt(a);
          const parsedB = parseInt(b);
          switch (op) {
            case "+":
              return parsedA + parsedB;
            case "-":
              return parsedA - parsedB;
            case "*":
              return parsedA * parsedB;
            case "/":
              return parsedA / parsedB;
            default:
              return;
          }
        };
        if (query.op === "" || query.op === undefined || query.op === null) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Chua nhap phep tinh");
          return;
        }
        const result = calculate(query.a, query.b, query.op);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>${query.a} ${query.op} ${query.b} = ${result}</h1>`);
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Duong dan khong ton tai");
        break;
    }
  })
  .listen(8080);

console.log("Server started on localhost:8080; press Ctrl-C to terminate....");
