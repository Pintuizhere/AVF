const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  featuredSectionVisible: { type: Boolean, default: true },
  clientsSectionHeading: { type: String, default: "Our Clients" },
  testimonialsSectionVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);
