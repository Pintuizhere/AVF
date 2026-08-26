const Featured = require("../models/Featured");
const fs = require("fs");

// @desc    Get all featured projects
// @route   GET /api/featured
// @access  Public
const getAllFeatured = async (req, res) => {
  try {
    const featuredItems = await Featured.find().sort({ createdAt: -1 });
    res.json(featuredItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add a featured project
// @route   POST /api/featured
// @access  Private (Admin only)
const addFeatured = async (req, res) => {
  try {
    const { title, category, type, url, src: bodySrc } = req.body;

    let src = bodySrc; // Fallback if they pass an external image URL
    if (req.file) {
      src = req.file.path; // Cloudinary URL
    }

    if (!src) {
      return res.status(400).json({ message: "Thumbnail (src) is required" });
    }

    const featured = await Featured.create({
      title,
      category,
      type,
      src,
      url,
    });

    res.status(201).json({ success: true, data: featured });
  } catch (error) {
    console.error("Error creating featured item:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a featured project
// @route   PUT /api/featured/:id
// @access  Private (Admin only)
const updateFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, type, url } = req.body;

    const featured = await Featured.findById(id);
    if (!featured) {
      return res.status(404).json({ message: "Featured item not found" });
    }

    if (title) featured.title = title;
    if (category !== undefined) featured.category = category;
    if (type) featured.type = type;
    if (url !== undefined) featured.url = url;

    // Optional new thumbnail
    if (req.file) {
      featured.src = req.file.path;
    }

    await featured.save();
    res.json({ success: true, data: featured });
  } catch (error) {
    console.error("Error updating featured item:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a featured project
// @route   DELETE /api/featured/:id
// @access  Private (Admin only)
const deleteFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const featured = await Featured.findByIdAndDelete(id);
    if (!featured) {
      return res.status(404).json({ message: "Featured item not found" });
    }
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllFeatured,
  addFeatured,
  updateFeatured,
  deleteFeatured,
};
