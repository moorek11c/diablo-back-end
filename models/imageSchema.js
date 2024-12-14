const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the image schema
const imageSchema = new Schema({
  image_name: {
    type: String,
    required: true,
  },
  image_data: {
    type: Buffer,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
