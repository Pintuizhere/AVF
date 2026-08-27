const Hero = require('../models/Hero');

// Get the hero settings (there should only be one)
exports.getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    
    // If no hero exists yet, create a default one
    if (!hero) {
      hero = await Hero.create({});
    }
    
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the hero settings
exports.updateHero = async (req, res) => {
  try {
    const { 
      headingLine1, 
      headingLine2, 
      subtitle, 
      videoReelUrl 
    } = req.body;

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero();
    }

    if (headingLine1 !== undefined) hero.headingLine1 = headingLine1;
    if (headingLine2 !== undefined) hero.headingLine2 = headingLine2;
    if (subtitle !== undefined) hero.subtitle = subtitle;
    if (videoReelUrl !== undefined) hero.videoReelUrl = videoReelUrl;

    if (req.file) {
      hero.bgMedia = req.file.path; // Cloudinary URL
      hero.bgMediaType = req.file.mimetype.startsWith("video/") ? "video" : "image";
    }

    await hero.save();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
