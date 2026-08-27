const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  headingLine1: {
    type: String,
    default: "We Don't Just\nCreate Videos,"
  },
  headingLine2: {
    type: String,
    default: "We Tell Stories."
  },
  subtitle: {
    type: String,
    default: "Cinematic Visuals. Powerful Stories.<br />Timeless Impact."
  },
  videoReelUrl: {
    type: String,
    default: ""
  },
  bgMedia: {
    type: String,
    default: "/images/hero-bg.jpg"
  },
  bgMediaType: {
    type: String,
    default: "image"
  }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
