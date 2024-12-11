/* eslint-disable no-console */
const express = require("express");

const app = express();

const indexRouter = require("./routes/index");

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use("/", indexRouter);

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Export the app for use in server.js
module.exports = app;
