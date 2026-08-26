const mongoose = require('mongoose');

const btsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  aspect: {
    type: String,
    default: 'aspect-[16/9]' // e.g., 'aspect-[16/9]', 'aspect-[9/16]', 'aspect-[4/5]'
  },
  url: {
    type: String,
    default: ''
  },
  imageId: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bts', btsSchema);
