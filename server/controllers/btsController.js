const Bts = require('../models/Bts');
const { cloudinary } = require('../config/cloudinary');

exports.getBts = async (req, res) => {
  try {
    const btsItems = await Bts.find().sort({ createdAt: -1 });
    res.json(btsItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBts = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No media uploaded' });

    const srcUrl = req.file.path;
    const publicId = req.file.filename;

    const newBts = new Bts({
      title: req.body.title,
      type: req.body.type || 'image',
      aspect: req.body.aspect || 'aspect-[16/9]',
      url: req.body.url || '',
      imageId: publicId,
      src: srcUrl
    });

    await newBts.save();
    res.status(201).json(newBts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBts = async (req, res) => {
  try {
    const btsItem = await Bts.findById(req.params.id);
    if (!btsItem) return res.status(404).json({ error: 'Not found' });

    // Handle optional file replacement
    if (req.file) {
      // delete old
      if (btsItem.imageId) {
        await cloudinary.uploader.destroy(btsItem.imageId);
      }
      btsItem.imageId = req.file.filename;
      btsItem.src = req.file.path;
    }

    if (req.body.title !== undefined) btsItem.title = req.body.title;
    if (req.body.type !== undefined) btsItem.type = req.body.type;
    if (req.body.aspect !== undefined) btsItem.aspect = req.body.aspect;
    if (req.body.url !== undefined) btsItem.url = req.body.url;

    await btsItem.save();
    res.json(btsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBts = async (req, res) => {
  try {
    const btsItem = await Bts.findById(req.params.id);
    if (!btsItem) return res.status(404).json({ error: 'Not found' });

    if (btsItem.imageId) {
      await cloudinary.uploader.destroy(btsItem.imageId);
    }
    
    await Bts.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
