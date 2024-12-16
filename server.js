/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");

// Create an Express app

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // URL of the React app front end domain
  credentials: true,
};

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware for JSON parsing
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/", indexRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
