const router = require("express").Router();
const reviewsRoutes = require("./reviewsRoutes");
const ImageUploads = require("./fileRoutes");
const quoteForm = require("./formRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/", adminRoutes);

router.use("/reviews", reviewsRoutes);

router.use("/images", ImageUploads);

router.use("/quote", quoteForm);

module.exports = router;
