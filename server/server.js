require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get("/", (req, res) => {
  res.json({ message: "AVF Productions API is running..." });
});

// Define Routes here later
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/featured", require("./routes/featuredRoutes"));
app.use("/api/shorts", require("./routes/shortRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bts", require("./routes/btsRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/stats", require("./routes/statRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
