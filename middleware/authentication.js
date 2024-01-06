const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envVariables");

const authenticateJWT = (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
