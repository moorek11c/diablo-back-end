require("dotenv").config();

const express = require("express");

const dbURL = process.env.DB_MONGO_URL;
console.log("connecting to", dbURL);

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
  .connect(dbURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(express.json());

app.use(
  cors({
    origin: "https://diabloexcavation.com", // Replace with your frontend's domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // HTTP methods you allow
    credentials: true, // Allow cookies or authorization headers
  })
);
app.use("/", indexRoutes);

app.use((req, res, next) => {
  next(new CustomError(ERROR_MESSAGES.INVALID_ROUTER, ERROR_CODES.NOT_FOUND));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
