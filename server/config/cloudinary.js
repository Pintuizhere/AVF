const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Ensure environment variables are loaded
require("dotenv").config();

// Cloudinary connection is automatically established if CLOUDINARY_URL is in the .env file.
// Alternatively, we can explicitly configure it if needed:
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "avf_production";
    let format = undefined;
    let resource_type = "auto";
    let transformation = [];

    // Check if file is image or video
    if (file.mimetype.startsWith("video/")) {
      resource_type = "video";
      // We can let Cloudinary optimize video on upload
      transformation = [
        { quality: "auto" },
        { fetch_format: "mp4" }
      ];
    } else {
      // For images, force format to webp and optimize quality
      resource_type = "image";
      format = "webp";
      transformation = [
        { quality: "auto", fetch_format: "webp" }
      ];
    }

    return {
      folder,
      resource_type,
      format,
      transformation,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov"],
    };
  }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
