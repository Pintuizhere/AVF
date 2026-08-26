const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  projectType: {
    type: String,
    required: [true, "Project type is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "In Progress", "Closed"],
    default: "New",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Lead", leadSchema);
