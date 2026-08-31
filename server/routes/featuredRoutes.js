const express = require("express");
const router = express.Router();
const {
  getAllFeatured,
  addFeatured,
  updateFeatured,
  deleteFeatured,
} = require("../controllers/featuredController");
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");

const { cacheMiddleware } = require("../middleware/cache");

// Public route
router.get("/", cacheMiddleware('featured'), getAllFeatured);

// Admin only routes
router.post("/", protect, upload.single("media"), addFeatured);
router.put("/:id", protect, upload.single("media"), updateFeatured);
router.delete("/:id", protect, deleteFeatured);

module.exports = router;
