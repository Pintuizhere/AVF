const mongoose = require('mongoose');

const clientLogoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  zoom: {
    type: Number,
    default: 1.0,
  }
}, { timestamps: true });

module.exports = mongoose.model('ClientLogo', clientLogoSchema);
