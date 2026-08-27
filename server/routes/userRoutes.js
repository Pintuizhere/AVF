const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  uploadProfilePicture,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

router.route("/")
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

router.route("/:id")
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/profile-picture", protect, upload.single("image"), uploadProfilePicture);

router.put("/password", protect, updateUserPassword);

module.exports = router;
