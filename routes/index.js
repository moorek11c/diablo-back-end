const router = require("express").Router();
const reviewsRouter = require("./reviews");
const formRouter = require("./fileRoutes");

// Use the reviews router
router.use("/reviews", reviewsRouter);

router.use("/images", formRouter);

module.exports = router;
