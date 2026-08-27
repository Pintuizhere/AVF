const mongoose = require("mongoose");

const aboutStorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Our Story",
    },
    heading: {
      type: String,
      default: "The Journey Behind AVF",
    },
    description: {
      type: String,
      default:
        "AVF Production began with a simple belief—every brand, every person and every moment has a story worth telling. What started as a passion project has grown into a full-scale production house trusted by clients across industries.",
    },
    media1: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
      resource_type: { type: String, default: "image" }, // 'image' or 'video'
    },
    media2: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
      resource_type: { type: String, default: "image" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutStory", aboutStorySchema);
