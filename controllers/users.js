const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { CustomError } = require("../utils/errors");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { log } = require("winston");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new CustomError(ERROR_MESSAGES.INVALID_DATA, ERROR_CODES.BAD_REQUEST);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
        ERROR_CODES.RESOURCE_EXISTS
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log(user);

    // Include user data in the response
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }

    return next(
      new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        ERROR_CODES.UNAUTHORIZED
      )
    );
  }
};

module.exports = {
  signup,
  signin,
  getCurrentUser,
};
