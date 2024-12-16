const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "invalid Token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
