const Image = require("../models/imageSchema");

exports.uploadImage = async (req, res) => {
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

exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
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

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.send(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send({ message: "Error fetching images" });
  }
};
