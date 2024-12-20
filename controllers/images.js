const Image = require("../models/imageSchema");

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send({ message: "Error fetching images" });
  }
};

module.exports = { getAllImages };
