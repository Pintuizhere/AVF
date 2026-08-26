const express = require("express");
const router = express.Router();
const {
  getAllServices,
  addService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");

// Public route
router.get("/", getAllServices);

// Admin only routes
router.post("/", protect, upload.single("media"), addService);
router.put("/:id", protect, upload.single("media"), updateService);
router.delete("/:id", protect, deleteService);

module.exports = router;
