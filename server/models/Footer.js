const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  aboutText: {
    type: String,
    default: "AVF is committed to creating premium visual experiences and telling stories with trust, quality, and excellence."
  },
  facebookUrl: {
    type: String,
    default: "#"
  },
  instagramUrl: {
    type: String,
    default: "#"
  },
  youtubeUrl: {
    type: String,
    default: "#"
  },
  linkedinUrl: {
    type: String,
    default: "#"
  },
  phoneNumbers: {
    type: String,
    default: "+91 9334713774\n+91 9431584755"
  },
  emailAddress: {
    type: String,
    default: "info@avf.com"
  },
  address: {
    type: String,
    default: "AVF Pvt. Ltd.\nOpposite Film City,\nMumbai - 400001"
  }
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);
