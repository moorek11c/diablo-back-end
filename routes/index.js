const router = require("express").Router();
const reviewsRouter = require("./reviews");
const formRouter = require("./fileRoutes");
const quoteForm = require("./formRoutes");
const authRouter = require("./authRoutes");

// Use the reviews router
router.use("/reviews", reviewsRouter);

router.use("/images", formRouter);

router.use("/api", quoteForm);

router.use("/api/auth", authRouter);

module.exports = router;
