require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const indexRoutes = require("./routes/index");

const {
  errorHandler,
  ERROR_CODES,
  ERROR_MESSAGES,
  CustomError,
} = require("./utils/errors");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.use("/", indexRoutes);

app.use((req, res, next) => {
  next(new CustomError(ERROR_MESSAGES.INVALID_ROUTER, ERROR_CODES.NOT_FOUND));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
