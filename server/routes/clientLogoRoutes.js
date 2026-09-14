const express = require('express');
const router = express.Router();
const clientLogoController = require('../controllers/clientLogoController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/', cacheMiddleware('clients'), clientLogoController.getClients);
router.post('/', protect, upload.single('image'), clientLogoController.createClient);
router.put('/:id', protect, upload.single('image'), clientLogoController.updateClient);
router.delete('/:id', protect, clientLogoController.deleteClient);

module.exports = router;
