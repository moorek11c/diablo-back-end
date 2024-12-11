const express = require("express");

const router = express.Router();

const reviewsRouter = require("./reviews");

// Use the reviews router
router.use("/reviews", reviewsRouter);

module.exports = router;
