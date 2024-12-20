const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { CustomError } = require("../utils/errors");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  try {
    const user = await this.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      console.log("password not matched");
      throw new CustomError(
        ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = mongoose.model("User", userSchema);
