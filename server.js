require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRoutes = require("./routes/index");
const {
  errorHandler,
  ERROR_CODES,
  ERROR_MESSAGES,
  CustomError,
} = require("./utils/errors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // URL of the React app front end domain
  credentials: true,
};

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors(corsOptions));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", indexRoutes);

app.use((req, res, next) => {
  next(new CustomError(ERROR_MESSAGES.INVALID_ROUTER, ERROR_CODES.NOT_FOUND));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
