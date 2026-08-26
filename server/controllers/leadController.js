const Lead = require("../models/Lead");

// @desc    Submit a new lead
// @route   POST /api/leads
// @access  Public
const submitLead = async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      projectType,
      message
    });

    res.status(201).json({ message: "Lead submitted successfully", lead });
  } catch (error) {
    console.error("Submit Lead Error:", error);
    res.status(500).json({ message: "Server error while submitting lead" });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin only)
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("Get Leads Error:", error);
    res.status(500).json({ message: "Server error while fetching leads" });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
// @access  Private (Admin only)
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = status || lead.status;
    const updatedLead = await lead.save();

    res.status(200).json(updatedLead);
  } catch (error) {
    console.error("Update Lead Error:", error);
    res.status(500).json({ message: "Server error while updating lead" });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin only)
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead removed" });
  } catch (error) {
    console.error("Delete Lead Error:", error);
    res.status(500).json({ message: "Server error while deleting lead" });
  }
};

module.exports = {
  submitLead,
  getLeads,
  updateLeadStatus,
  deleteLead
};
