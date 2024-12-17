const jwt = require("jsonwebtoken");
const { CustomError, ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new CustomError(
      ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
      ERROR_CODES.UNAUTHORIZED
    );
  }

  const token = authorization.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    console.error("Error in auth middleware:", err);
    throw new CustomError(
      ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
      ERROR_CODES.UNAUTHORIZED
    );
  }
};

module.exports = authMiddleware;