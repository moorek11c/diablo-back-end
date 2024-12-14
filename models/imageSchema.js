const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the image schema
const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

// Create the model
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
