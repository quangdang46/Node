var http = require("http"),
  fs = require("fs"),
  url = require("url");

http
  .createServer(function (req, res) {
    var path = url.parse(req.url).pathname.replace(/\/$/, "").toLowerCase();
    switch (path) {
      case "":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync(__dirname + "/ex1.html", "utf-8"));
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
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Duong dan khong ton tai");
        break;
    }
  })
  .listen(8080);

console.log("Server started on localhost:8080; press Ctrl-C to terminate....");
