const router = require("express").Router();
const reviewsRoutes = require("./reviewsRoutes");
const ImageUploads = require("./fileRoutes");
const quoteForm = require("./formRoutes");
const userRoutes = require("./users");

router.use("/users", userRoutes);

router.use("/reviews", reviewsRoutes);

router.use("/images", ImageUploads);

router.use("/quote", quoteForm);

module.exports = router;
