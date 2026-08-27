const AboutStory = require("../models/AboutStory");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get About Story
// @route   GET /api/aboutstory
// @access  Public
const getAboutStory = async (req, res) => {
  try {
    let aboutStory = await AboutStory.findOne();
    if (!aboutStory) {
      // Create a default one if it doesn't exist
      aboutStory = await AboutStory.create({});
    }
    res.status(200).json(aboutStory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update About Story
// @route   PUT /api/aboutstory
// @access  Private/Admin
const updateAboutStory = async (req, res) => {
  try {
    const { title, heading, description } = req.body;

    let aboutStory = await AboutStory.findOne();
    if (!aboutStory) {
      aboutStory = new AboutStory();
    }

    aboutStory.title = title || aboutStory.title;
    aboutStory.heading = heading || aboutStory.heading;
    aboutStory.description = description || aboutStory.description;

    // Handle media1 upload
    if (req.files && req.files.media1 && req.files.media1[0]) {
      const file = req.files.media1[0];
      // Delete old media1 from cloudinary if it exists
      if (aboutStory.media1 && aboutStory.media1.public_id) {
        try {
          await cloudinary.uploader.destroy(aboutStory.media1.public_id, {
            resource_type: aboutStory.media1.resource_type || "image"
          });
        } catch (err) {
          console.error("Error deleting old media1:", err);
        }
      }
      aboutStory.media1 = {
        url: file.path,
        public_id: file.filename,
        resource_type: file.mimetype.startsWith("video/") ? "video" : "image",
      };
    }

    // Handle media2 upload
    if (req.files && req.files.media2 && req.files.media2[0]) {
      const file = req.files.media2[0];
      // Delete old media2 from cloudinary if it exists
      if (aboutStory.media2 && aboutStory.media2.public_id) {
        try {
          await cloudinary.uploader.destroy(aboutStory.media2.public_id, {
            resource_type: aboutStory.media2.resource_type || "image"
          });
        } catch (err) {
          console.error("Error deleting old media2:", err);
        }
      }
      aboutStory.media2 = {
        url: file.path,
        public_id: file.filename,
        resource_type: file.mimetype.startsWith("video/") ? "video" : "image",
      };
    }

    const updatedAboutStory = await aboutStory.save();
    res.status(200).json(updatedAboutStory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAboutStory,
  updateAboutStory,
};
