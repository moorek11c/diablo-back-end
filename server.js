/* eslint-disable no-console */
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const app = require("./app");

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the application if the connection fails
  });

app.use(express.json());

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
