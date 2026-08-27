const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['WhatsApp', 'Instagram', 'YouTube', 'Facebook', 'X/Twitter', 'LinkedIn', 'TikTok', 'Email']
  },
  url: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('SocialLink', socialLinkSchema);
