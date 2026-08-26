const mongoose = require("mongoose");

const shortSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  type: { type: String, enum: ["image", "video"], required: true, default: "video" },
  src: { type: String, required: true }, // This will store the Cloudinary URL or external URL
  url: { type: String } // Optional external link (like YouTube)
}, {
  timestamps: true
});

module.exports = mongoose.model("Short", shortSchema);
