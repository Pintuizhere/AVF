const Settings = require("../models/Settings");

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ featuredSectionVisible: true, clientsSectionHeading: "Our Clients", testimonialsSectionVisible: true });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ featuredSectionVisible: true, clientsSectionHeading: "Our Clients", testimonialsSectionVisible: true });
    }
    
    if (req.body.featuredSectionVisible !== undefined) {
      settings.featuredSectionVisible = req.body.featuredSectionVisible;
    }
    if (req.body.clientsSectionHeading !== undefined) {
      settings.clientsSectionHeading = req.body.clientsSectionHeading;
    }
    if (req.body.testimonialsSectionVisible !== undefined) {
      settings.testimonialsSectionVisible = req.body.testimonialsSectionVisible;
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
