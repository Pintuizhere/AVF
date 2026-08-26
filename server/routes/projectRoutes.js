const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");
const { 
  createProject, 
  getProjects, 
  getProjectBySlug, 
  deleteProject 
} = require("../controllers/projectController");

// Public routes
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Protected admin routes
router.post("/", protect, upload.single("media"), createProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
