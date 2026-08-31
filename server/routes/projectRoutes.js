const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");
const { 
  createProject, 
  getProjects, 
  getProjectBySlug, 
  deleteProject,
  recordProjectView
} = require("../controllers/projectController");

const { cacheMiddleware } = require('../middleware/cache');

// Public routes
router.get("/", cacheMiddleware('projects'), getProjects);
router.get("/:slug", cacheMiddleware('projects'), getProjectBySlug);
router.post("/:id/view", recordProjectView);

// Protected admin routes
router.post("/", protect, upload.single("media"), createProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
