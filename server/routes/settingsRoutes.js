const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");
const { cacheMiddleware } = require("../middleware/cache");

router.get("/", cacheMiddleware('settings'), settingsController.getSettings);
router.put("/", protect, settingsController.updateSettings);

module.exports = router;
