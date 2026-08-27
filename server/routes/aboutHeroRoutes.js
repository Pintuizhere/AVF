const express = require('express');
const router = express.Router();
const { getAboutHero, updateAboutHero } = require('../controllers/aboutHeroController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public route to fetch about hero data
router.get('/', getAboutHero);

// Protected admin route to update about hero data
router.put('/', protect, upload.single('image'), updateAboutHero);

module.exports = router;
