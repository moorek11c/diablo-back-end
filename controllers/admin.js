const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { CustomError, ERROR_MESSAGES } = require("../utils/errors");
require("dotenv").config();

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

const login = async (req, res, next) => {
  const { username, password } = req.body;

  console.log("adminUsername:", adminUsername);
  console.log("adminPasswordHash:", adminPassword);
  console.log("provided username:", username);
  console.log("provided password:", password);

  try {
    if (!username || !password) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    if (username !== adminUsername) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, adminPassword);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    res.json({ token: process.env.JWT_SECRET });
  } catch (error) {
    console.error("login error", error);
    if (error instanceof CustomError) {
      return next(error);
    }
    return next(new CustomError(ERROR_MESSAGES.INVALID_DATA));
  }
};

module.exports = { login };
