const router = require("express").Router;
const imageController = require("../controllers/images");

// Get all images route
router.get("/images", imageController.getAllImages);

module.exports = router;
