const Project = require('../models/Project');
const Lead = require('../models/Lead');
const Service = require('../models/Service');
const Short = require('../models/Short');
const Testimonial = require('../models/Testimonial');
const ClientLogo = require('../models/ClientLogo');
const cloudinary = require('cloudinary').v2;

const Analytics = require('../models/Analytics');

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
            limitBytes: 25 * 1024 * 1024 * 1024,
            percent: usageData.storage.usage ? ((usageData.storage.usage / (25 * 1024 * 1024 * 1024)) * 100).toFixed(2) : 0
          };
        }
      }
    } catch (cErr) {
      console.error("Cloudinary usage fetch error:", cErr);
    }

    // Generate Analytics Data based on range
    const range = req.query.range || '30';
    const analyticsData = [];
    const today = new Date();

    if (range === 'all') {
      const analyticsRecords = await Analytics.find({ type: 'project_view' }).sort({ date: 1 });
      analyticsRecords.forEach(record => {
        const d = new Date(record.date);
        analyticsData.push({
          date: `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()} '${d.getFullYear().toString().slice(-2)}`,
          views: record.views
        });
      });
    } else {
      let days = parseInt(range);
      if (isNaN(days)) days = 30;

      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (days - 1));

      const analyticsRecords = await Analytics.find({
        type: 'project_view',
        date: {
          $gte: startDate.toISOString().split('T')[0],
          $lte: today.toISOString().split('T')[0]
        }
      }).sort({ date: 1 });

      const recordsByDate = {};
      analyticsRecords.forEach(record => {
        recordsByDate[record.date] = record.views;
      });

      // To avoid huge charts for 365 days, we can step if it's large, but let's just send all days for now.
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const monthShort = d.toLocaleString('en-US', { month: 'short' });
        const day = d.getDate().toString().padStart(2, '0');
        const year = d.getFullYear().toString().slice(-2);

        analyticsData.push({
          date: days > 60 ? `${monthShort} '${year}` : `${monthShort} ${day}`,
          views: recordsByDate[dateStr] || 0
        });
      }
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
      storageUsage,
      analyticsData
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ error: "Server error fetching dashboard stats" });
  }
};
