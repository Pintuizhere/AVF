const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'about'],
    unique: true
  },
  stats: {
    stat1_num: { type: Number, default: 0 },
    stat1_label: { type: String, default: '' },
    stat2_num: { type: Number, default: 0 },
    stat2_label: { type: String, default: '' },
    stat3_num: { type: Number, default: 0 },
    stat3_label: { type: String, default: '' },
    stat4_num: { type: Number, default: 0 },
    stat4_label: { type: String, default: '' },
  }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);
