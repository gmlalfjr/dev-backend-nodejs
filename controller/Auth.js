const jwt = require("jsonwebtoken");
const status = require("../commonresponse/response");
const config = require("config");

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined

  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    if (bearer == null) return res.sendStatus(401);
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    jwt.verify(bearerToken, config.get("jwtSecret"), (err, user) => {
      if (err) return res.json(status.error(403, "No Authorization"));

      req.user = user;

      next();
    });
    // Next middleware
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function verifyToken2(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = { verifyToken, verifyToken2 };
