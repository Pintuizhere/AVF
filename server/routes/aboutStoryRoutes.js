const express = require("express");
const router = express.Router();
const { getAboutStory, updateAboutStory } = require("../controllers/aboutStoryController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

router.get("/", getAboutStory);

router.put(
  "/",
  protect,
  upload.fields([
    { name: "media1", maxCount: 1 },
    { name: "media2", maxCount: 1 },
  ]),
  updateAboutStory
);

module.exports = router;
