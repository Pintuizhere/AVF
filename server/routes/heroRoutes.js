const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public route to fetch hero data
router.get('/', getHero);

// Protected admin route to update hero data
router.put('/', protect, upload.single('bgMedia'), updateHero);

module.exports = router;
