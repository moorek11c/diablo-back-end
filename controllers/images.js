const heicConvert = require("heic-convert");
const Image = require("../models/imageSchema");

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  let imageData = req.file.buffer;
  const imageName = req.file.originalname;
  const uploadDate = new Date();

  // Convert .heic to .jpeg if necessary
  if (req.file.mimetype === "image/heic") {
    try {
      const outputBuffer = await heicConvert({
        buffer: imageData, // the HEIC file buffer
        format: "JPEG", // output format
        quality: 1, // the jpeg compression quality, between 0 and 1
      });
      imageData = outputBuffer;
    } catch (error) {
      console.error("Error converting .heic file:", error);
      return res.status(500).json({ message: "Error converting .heic file" });
    }
  }

  // Convert buffer to Base64 string
  const imageBase64 = imageData.toString("base64");

  try {
    const newImage = new Image({
      image_name: imageName,
      image_data: imageBase64,
      upload_date: uploadDate,
    });

    await newImage.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      imageId: newImage._id,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Database error" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({}, "image_name _id");
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Database error" });
  }
};

const getImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Convert Base64 string back to buffer
    const imageBuffer = Buffer.from(image.image_data, "base64");

    res.contentType("image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Database error" });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
};
