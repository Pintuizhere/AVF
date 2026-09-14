const express = require("express");
const router = express.Router();
const {
  getAllShorts,
  addShort,
  updateShort,
  deleteShort,
} = require("../controllers/shortController");
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");
const { cacheMiddleware } = require("../middleware/cache");

// Public route
router.get("/", cacheMiddleware('shorts'), getAllShorts);

// Admin only routes
router.post("/", protect, upload.single("media"), addShort);
router.put("/:id", protect, upload.single("media"), updateShort);
router.delete("/:id", protect, deleteShort);

module.exports = router;
