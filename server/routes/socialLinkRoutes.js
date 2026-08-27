const express = require('express');
const router = express.Router();
const { getSocialLinks, getAllSocialLinksAdmin, addSocialLink, updateSocialLink, deleteSocialLink } = require('../controllers/socialLinkController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSocialLinks);
router.get('/admin', protect, getAllSocialLinksAdmin);
router.post('/', protect, addSocialLink);
router.put('/:id', protect, updateSocialLink);
router.delete('/:id', protect, deleteSocialLink);

module.exports = router;
