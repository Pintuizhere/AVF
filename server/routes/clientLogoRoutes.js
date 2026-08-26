const express = require('express');
const router = express.Router();
const clientLogoController = require('../controllers/clientLogoController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/', clientLogoController.getClients);
router.post('/', protect, upload.single('image'), clientLogoController.createClient);
router.put('/:id', protect, upload.single('image'), clientLogoController.updateClient);
router.delete('/:id', protect, clientLogoController.deleteClient);

module.exports = router;
