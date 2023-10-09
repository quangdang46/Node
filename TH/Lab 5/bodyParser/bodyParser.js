const querystring = require("querystring");

const bodyParser = (req, res, next) => {
  const contentType = req.headers["content-type"];
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    switch (contentType) {
      case "application/json":
        try {
          req.data = JSON.parse(body);
        } catch (error) {
          return res.status(400).json({ error: "Invalid JSON data" });
        }
        break;
      case "application/x-www-form-urlencoded":
        try {
          req.data = querystring.parse(body);
        } catch (error) {
          return res.status(400).json({ error: "Invalid form data" });
        }
        break;
      default:
        req.data = req.query;
        break;
    }
    next();
  });
};

module.exports = bodyParser;
