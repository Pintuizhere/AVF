const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  date: { 
    type: String, 
    required: true,
    // Store as YYYY-MM-DD to easily aggregate
  }, 
  type: { 
    type: String, 
    required: true, 
    default: "project_view" 
  },
  views: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

// Compound index for fast queries and upserts
analyticsSchema.index({ date: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Analytics", analyticsSchema);
