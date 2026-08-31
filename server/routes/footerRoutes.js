const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');
const { protect } = require('../middleware/authMiddleware');

const { cacheMiddleware } = require('../middleware/cache');

// Public route to get footer data
router.get('/', cacheMiddleware('footer'), footerController.getFooter);

// Protected route to update footer data
router.put('/', protect, footerController.updateFooter);

module.exports = router;
