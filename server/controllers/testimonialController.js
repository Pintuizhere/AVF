const Testimonial = require('../models/Testimonial');
const { cloudinary } = require('../config/cloudinary');
const { invalidateCache } = require('../middleware/cache');

exports.getTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    let avatarUrl = '';
    let avatarId = '';

    if (req.file) {
      avatarUrl = req.file.path;
      avatarId = req.file.filename;
    }

    const newItem = new Testimonial({
      text: req.body.text,
      author: req.body.author,
      role: req.body.role,
      rating: req.body.rating || 5,
      avatarUrl,
      avatarId
    });

    await newItem.save();
    res.status(201).json(newItem);
    await invalidateCache('testimonials');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    // Handle optional file replacement
    if (req.file) {
      // delete old
      if (item.avatarId) {
        await cloudinary.uploader.destroy(item.avatarId);
      }
      item.avatarId = req.file.filename;
      item.avatarUrl = req.file.path;
    }

    if (req.body.text !== undefined) item.text = req.body.text;
    if (req.body.author !== undefined) item.author = req.body.author;
    if (req.body.role !== undefined) item.role = req.body.role;
    if (req.body.rating !== undefined) item.rating = req.body.rating;

    await item.save();
    res.json(item);
    await invalidateCache('testimonials');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (item.avatarId) {
      await cloudinary.uploader.destroy(item.avatarId);
    }
    
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
    await invalidateCache('testimonials');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
