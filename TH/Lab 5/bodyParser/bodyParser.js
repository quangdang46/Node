const querystring = require("querystring");

const bodyParser = (req, res, next) => {
  const contentType = req.headers["content-type"];
  switch (contentType) {
    case "application/json":
      req.body = JSON.parse(req.body);
      break;
    case "application/x-www-form-urlencoded":
      req.body = querystring.parse(req.body);
      break;
    default:
      break;
  }
  next();
};

module.exports = bodyParser;
