const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  client: { type: String },
  category: { type: String, required: true },
  year: { type: String },
  brief: { type: String, required: true },
  metadata: {
    iso: { type: String },
    aperture: { type: String },
    fps: { type: String }
  },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["image", "video"], required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);
