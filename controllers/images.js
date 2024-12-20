const mongoose = require("mongoose");
const Image = require("../models/imageSchema");

const uploadImage = async (req, res) => {
  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).send({ message: "No file uploaded" });
  }

  const newImage = new Image({
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });

  try {
    const savedImage = await newImage.save();

    res.send({
      message: "Image uploaded successfully",
      imageId: savedImage._id,
    });
  } catch (err) {
    console.error("Error saving image:", err);
    res.status(500).send({ message: "Error saving image" });
  }
};

const getImageById = async (req, res) => {
  try {
    const imageId = new mongoose.Types.ObjectId(req.params.id);
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).send("Image not found");
    }

    res.setHeader("Content-Type", image.contentType);
    res.send(image.data);
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).send({ message: "Error fetching image" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send({ message: "Error fetching images" });
  }
};

module.exports = { uploadImage, getAllImages };
