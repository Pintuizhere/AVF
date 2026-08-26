const Short = require("../models/Short");

// @desc    Get all shorts
// @route   GET /api/shorts
// @access  Public
const getAllShorts = async (req, res) => {
  try {
    const shorts = await Short.find().sort({ createdAt: -1 });
    res.json(shorts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add a short
// @route   POST /api/shorts
// @access  Private (Admin only)
const addShort = async (req, res) => {
  try {
    const { title, category, type, url, src: bodySrc } = req.body;

    let src = bodySrc; // Fallback if they pass an external image URL
    if (req.file) {
      src = req.file.path; // Cloudinary URL
    }

    if (!src) {
      return res.status(400).json({ message: "Thumbnail (src) is required" });
    }

    const short = await Short.create({
      title,
      category,
      type,
      src,
      url,
    });

    res.status(201).json({ success: true, data: short });
  } catch (error) {
    console.error("Error creating short:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a short
// @route   PUT /api/shorts/:id
// @access  Private (Admin only)
const updateShort = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, type, url } = req.body;

    const short = await Short.findById(id);
    if (!short) {
      return res.status(404).json({ message: "Short item not found" });
    }

    if (title !== undefined) short.title = title;
    if (category !== undefined) short.category = category;
    if (type !== undefined) short.type = type;
    if (url !== undefined) short.url = url;

    // Optional new thumbnail
    if (req.file) {
      short.src = req.file.path;
    }

    await short.save();
    res.json({ success: true, data: short });
  } catch (error) {
    console.error("Error updating short:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a short
// @route   DELETE /api/shorts/:id
// @access  Private (Admin only)
const deleteShort = async (req, res) => {
  try {
    const { id } = req.params;
    const short = await Short.findByIdAndDelete(id);
    if (!short) {
      return res.status(404).json({ message: "Short item not found" });
    }
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllShorts,
  addShort,
  updateShort,
  deleteShort,
};
