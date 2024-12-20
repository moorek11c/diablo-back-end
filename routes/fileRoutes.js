const router = require("express").Router;
const imageController = require("../controllers/images");

// Get all images route
router.post("/images", imageController.getAllImages);

module.exports = router;
