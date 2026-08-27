const Project = require('../models/Project');
const Lead = require('../models/Lead');
const Service = require('../models/Service');
const Short = require('../models/Short');
const Testimonial = require('../models/Testimonial');
const ClientLogo = require('../models/ClientLogo');
const cloudinary = require('cloudinary').v2;

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalShorts = await Short.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    const totalClients = await ClientLogo.countDocuments();
    
    // Recent Leads
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
    
    // Recent Projects
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5);

    // Fetch Cloudinary Storage usage
    let storageUsage = { usedBytes: 0, limitBytes: 0, percent: 0 };
    try {
      if (process.env.CLOUDINARY_URL) {
        const usageData = await cloudinary.api.usage();
        if (usageData && usageData.storage) {
          storageUsage = {
            usedBytes: usageData.storage.usage || 0,
            limitBytes: 25 * 1024 * 1024 * 1024, // Assuming 25GB free tier limit for credits, or just display raw usage
            percent: usageData.storage.usage ? ((usageData.storage.usage / (25 * 1024 * 1024 * 1024)) * 100).toFixed(2) : 0
          };
        }
      }
    } catch (cErr) {
      console.error("Cloudinary usage fetch error:", cErr);
    }

    res.json({
      totalProjects,
      totalLeads,
      totalServices,
      totalShorts,
      totalTestimonials,
      totalClients,
      recentLeads,
      recentProjects,
      storageUsage
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ error: "Server error fetching dashboard stats" });
  }
};
