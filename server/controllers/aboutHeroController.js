const AboutHero = require('../models/AboutHero');

// Get the about hero settings
exports.getAboutHero = async (req, res) => {
  try {
    let hero = await AboutHero.findOne();
    
    if (!hero) {
      hero = await AboutHero.create({});
    }
    
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the about hero settings
exports.updateAboutHero = async (req, res) => {
  try {
    const { 
      badge, 
      title, 
      subtitle, 
      content,
      signatureName,
      signatureRole
    } = req.body;

    let hero = await AboutHero.findOne();

    if (!hero) {
      hero = new AboutHero();
    }

    if (badge !== undefined) hero.badge = badge;
    if (title !== undefined) hero.title = title;
    if (subtitle !== undefined) hero.subtitle = subtitle;
    if (content !== undefined) hero.content = content;
    if (signatureName !== undefined) hero.signatureName = signatureName;
    if (signatureRole !== undefined) hero.signatureRole = signatureRole;

    if (req.file) {
      hero.image = req.file.path; // Cloudinary URL
    }

    await hero.save();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
