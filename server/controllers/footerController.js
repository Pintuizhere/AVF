const Footer = require('../models/Footer');
const { invalidateCache } = require('../middleware/cache');

// Get the footer (there should only be one)
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    
    // If no footer exists yet, create a default one
    if (!footer) {
      footer = await Footer.create({});
    }
    
    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the footer
exports.updateFooter = async (req, res) => {
  try {
    const { 
      aboutText, 
      facebookUrl, 
      instagramUrl, 
      youtubeUrl, 
      linkedinUrl, 
      phoneNumbers, 
      emailAddress, 
      address,
      workingHours
    } = req.body;

    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer();
    }

    if (aboutText !== undefined) footer.aboutText = aboutText;
    if (facebookUrl !== undefined) footer.facebookUrl = facebookUrl;
    if (instagramUrl !== undefined) footer.instagramUrl = instagramUrl;
    if (youtubeUrl !== undefined) footer.youtubeUrl = youtubeUrl;
    if (linkedinUrl !== undefined) footer.linkedinUrl = linkedinUrl;
    if (phoneNumbers !== undefined) footer.phoneNumbers = phoneNumbers;
    if (emailAddress !== undefined) footer.emailAddress = emailAddress;
    if (address !== undefined) footer.address = address;
    if (workingHours !== undefined) footer.workingHours = workingHours;

    await footer.save();
    await invalidateCache('footer');
    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
