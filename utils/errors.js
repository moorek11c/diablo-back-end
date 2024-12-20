const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  RESOURCE_EXISTS: 409,
};

const ERROR_MESSAGES = {
  SERVER_ERROR: "An error has occurred on the server.",
  ITEM_NOT_FOUND: "No item found with the given ID.",
  USER_NOT_FOUND: "No user found with the given ID.",
  INVALID_DATA: "Invalid data provided.",
  INVALID_ID: "Invalid ID provided.",
  INVALID_ROUTER: "Invalid Router provided.",
  EMAIL_ALREADY_EXISTS: "Email already in use",
  NOT_AUTHORIZED_LOGIIN: "Incorrect email or password!",
  FORBIDDEN: "You are not authorized to perform this action.",
};

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Global error handler middleware
function errorHandler(err, req, res, next) {
  let statusCode = ERROR_CODES.SERVER_ERROR;
  let message = ERROR_MESSAGES.SERVER_ERROR;

  if (err instanceof CustomError) {
    statusCode = err.statusCode || ERROR_CODES.SERVER_ERROR;
    message = err.message || ERROR_MESSAGES.SERVER_ERROR;
  } else if (err.name === "ValidationError") {
    statusCode = ERROR_CODES.BAD_REQUEST;
    message =
      Object.values(err.errors)
        .map((e) => e.message)
        .join(", ") || ERROR_MESSAGES.INVALID_DATA;
  } else if (err.name === "CastError") {
    statusCode = ERROR_CODES.BAD_REQUEST;
    message = ERROR_MESSAGES.INVALID_ID;
  }

  res.status(statusCode).json({ message });
}

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
  CustomError,
  errorHandler,
};
