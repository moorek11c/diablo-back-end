const express = require("express");
const multer = require("multer");
const imageController = require("../controllers/images");

const router = express.Router();

// Configure multer for file uploads (store files in memory)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  // Accept images and .heic files
  if (file.mimetype.startsWith("image/") || file.mimetype === "image/heic") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only images and .heic files are allowed!"),
      false
    );
  }
};
const upload = multer({ storage, fileFilter });

// Image upload route
router.post("/upload", upload.single("image"), imageController.uploadImage);

// Get image by ID route
router.get("/:id", imageController.getImageById);

// Get all images route
router.get("/", imageController.getAllImages);

module.exports = router;
