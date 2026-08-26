require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "avfproduction@gmail.com" });
    
    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit();
    }

    const admin = await User.create({
      name: "Super Admin",
      email: "avfproduction@gmail.com",
      password: "avf@834001",
      role: "Super Admin",
      status: "Active"
    });

    console.log("Admin user seeded successfully:", admin.email);
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
