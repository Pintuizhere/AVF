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
  params: {
    folder: "avf_production",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov"],
    // transformation: [{ width: 1920, crop: "limit" }] // Optional transformation
  }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
