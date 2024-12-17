const router = require("express").Router();
const reviewsRouter = require("./reviews");
const formRouter = require("./fileRoutes");
const quoteForm = require("./formRoutes");
const authRouter = require("./authRoutes");
const authMiddleware = require("../middleware/authMiddleware");

// Use the reviews router
router.use("/reviews", reviewsRouter);

router.use("/images", formRouter);

router.use("/", quoteForm);

router.use("/auth", authRouter);

router.use("/api/protected", authMiddleware, authRouter);

module.exports = router;
