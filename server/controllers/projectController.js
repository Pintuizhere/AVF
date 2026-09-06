const Project = require("../models/Project");
const { invalidateCache } = require("../middleware/cache");

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const { title, slug, client, category, year, brief, mediaUrl: bodyMediaUrl, aspect } = req.body;

    let mediaUrl = bodyMediaUrl || "";
    let thumbnailUrl = "";
    let mediaType = "image";

    if (mediaUrl) {
      const lowerUrl = mediaUrl.toLowerCase();
      if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') || lowerUrl.includes('vimeo.com') || lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.includes('instagram.com')) {
        mediaType = "video";
      }
    }

    if (req.file) {
      if (mediaUrl) {
        // External URL provided, use the uploaded file as a thumbnail
        thumbnailUrl = req.file.path;
      } else {
        // No external URL, the uploaded file is the primary media
        mediaUrl = req.file.path;
        mediaType = req.file.mimetype.startsWith("video/") ? "video" : "image";
      }
    } else if (!mediaUrl) {
      return res.status(400).json({ message: "Media file or external URL is required" });
    }

    // Auto-generate slug if not provided
    const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const project = await Project.create({
      title,
      slug: projectSlug,
      client,
      category,
      year,
      brief,
      mediaUrl,
      thumbnailUrl,
      mediaType,
      aspect: aspect || "aspect-[16/9]",
    });

    res.status(201).json(project);
    await invalidateCache('projects');
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Server error while creating project" });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
};

const mongoose = require("mongoose");

// @desc    Get project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let query = { slug: slug };
    
    // Fallback to searching by _id if the slug is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(slug)) {
      query = { $or: [{ slug: slug }, { _id: slug }] };
    }

    const project = await Project.findOne(query);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Get Project Error:", error);
    res.status(500).json({ message: "Server error while fetching project" });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project removed" });
    await invalidateCache('projects');
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server error while deleting project" });
  }
};

const Analytics = require("../models/Analytics");

// @desc    Record a project view
// @route   POST /api/projects/:id/view
// @access  Public
const recordProjectView = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    await Analytics.findOneAndUpdate(
      { date: today, type: "project_view" },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Record View Error:", error);
    res.status(500).json({ message: "Server error while recording view" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectBySlug,
  deleteProject,
  recordProjectView
};
