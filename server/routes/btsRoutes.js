const express = require('express');
const router = express.Router();
const btsController = require('../controllers/btsController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/', btsController.getBts);
router.post('/', protect, upload.single('media'), btsController.createBts);
router.put('/:id', protect, upload.single('media'), btsController.updateBts);
router.delete('/:id', protect, btsController.deleteBts);

module.exports = router;
