const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', statController.getStats);
router.put('/:page', protect, statController.updateStats);

module.exports = router;
