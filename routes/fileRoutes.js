const router = require("express").Router;
const imageController = require("../controllers/images");

// Image upload route
router.post("/upload", upload.single("image"), imageController.uploadImage);

// Get image by ID route
router.get("/:id", imageController.getImageById);

// Get all images route
router.get("/", imageController.getAllImages);

// Delete image by ID route
router.delete("/:id", imageController.deleteImageById);

module.exports = router;
