const SocialLink = require('../models/SocialLink');

// Get all active social links (public)
exports.getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find({ isActive: true }).sort({ order: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all social links including inactive (Admin)
exports.getAllSocialLinksAdmin = async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ order: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Add new social link
exports.addSocialLink = async (req, res) => {
  try {
    const { platform, url, isActive, order } = req.body;
    const newLink = new SocialLink({ platform, url, isActive, order });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update social link
exports.updateSocialLink = async (req, res) => {
  try {
    const updatedLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete social link
exports.deleteSocialLink = async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
