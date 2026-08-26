const Service = require("../models/Service");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add a service
// @route   POST /api/services
// @access  Private (Admin only)
const addService = async (req, res) => {
  try {
    const { title, description, iconName } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path; // Cloudinary URL
    } else {
      image = "/images/hero-bg.jpg"; // Fallback default image
    }

    const service = await Service.create({
      title,
      description,
      iconName,
      image,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, iconName } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service item not found" });
    }

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (iconName !== undefined) service.iconName = iconName;

    // Optional new image
    if (req.file) {
      service.image = req.file.path;
    }

    await service.save();
    res.json({ success: true, data: service });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service item not found" });
    }
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllServices,
  addService,
  updateService,
  deleteService,
};
