const Stat = require('../models/Stat');

const defaultHomeStats = {
  stat1_num: 150, stat1_label: "Projects",
  stat2_num: 10, stat2_label: "Years Experience",
  stat3_num: 50, stat3_label: "Creative Team",
  stat4_num: 5000, stat4_label: "Hours of Footage",
};

const defaultAboutStats = {
  stat1_num: 7, stat1_label: "Years Of Experience",
  stat2_num: 250, stat2_label: "Projects Completed",
  stat3_num: 150, stat3_label: "Happy Clients",
  stat4_num: 10, stat4_label: "Industries Served",
};

exports.getStats = async (req, res) => {
  try {
    const { page } = req.query; // 'home' or 'about'
    
    if (!page || !['home', 'about'].includes(page)) {
      return res.status(400).json({ error: "Invalid page parameter" });
    }

    let statDoc = await Stat.findOne({ page });

    // If it doesn't exist yet, return the defaults
    if (!statDoc) {
      return res.json({
        page,
        stats: page === 'home' ? defaultHomeStats : defaultAboutStats
      });
    }

    res.json(statDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStats = async (req, res) => {
  try {
    const { page } = req.params; // 'home' or 'about'
    const { stats } = req.body;

    if (!page || !['home', 'about'].includes(page)) {
      return res.status(400).json({ error: "Invalid page parameter" });
    }

    const updated = await Stat.findOneAndUpdate(
      { page },
      { stats },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
