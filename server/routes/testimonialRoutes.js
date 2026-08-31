const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/', cacheMiddleware('testimonials'), testimonialController.getTestimonials);
router.post('/', protect, upload.single('avatar'), testimonialController.createTestimonial);
router.put('/:id', protect, upload.single('avatar'), testimonialController.updateTestimonial);
router.delete('/:id', protect, testimonialController.deleteTestimonial);

module.exports = router;
