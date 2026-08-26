const Project = require("../models/Project");

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const { title, slug, client, category, year, brief, mediaUrl: bodyMediaUrl } = req.body;

    let mediaUrl = "";
    let mediaType = "image";

    if (req.file) {
      mediaUrl = req.file.path; // Cloudinary URL
      mediaType = req.file.mimetype.startsWith("video/") ? "video" : "image";
    } else if (bodyMediaUrl) {
      mediaUrl = bodyMediaUrl;
      // Infer type from URL
      const lowerUrl = mediaUrl.toLowerCase();
      if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') || lowerUrl.includes('vimeo.com') || lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm')) {
        mediaType = "video";
      }
    } else {
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
      mediaType,
    });

    res.status(201).json(project);
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

// @desc    Get project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

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
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server error while deleting project" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectBySlug,
  deleteProject
};
