const express = require("express");
const router = express.Router();
const { submitLead, getLeads, updateLeadStatus, deleteLead } = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware");

// Public route to submit lead
router.post("/", submitLead);

// Protected admin routes
router.get("/", protect, getLeads);
router.put("/:id", protect, updateLeadStatus);
router.delete("/:id", protect, deleteLead);

module.exports = router;
