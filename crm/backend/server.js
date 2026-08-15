require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const { notFound, errorHandler } = require("./middleware/errorHandler");

const leadRoutes = require("./routes/leads");
const customerRoutes = require("./routes/customers");
const activityRoutes = require("./routes/activities");
const dealRoutes = require("./routes/deals");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

// ===============================
// Connect to MongoDB
// ===============================
connectDB();

// ===============================
// Middleware
// ===============================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Root Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Enterprise CRM API is running",
  });
});

// ===============================
// Health Check
// ===============================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CRM API is running",
  });
});

// ===============================
// API Routes
// ===============================
app.use("/api/leads", leadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ===============================
// 404 + Error Handling
// ===============================
app.use(notFound);
app.use(errorHandler);

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CRM API server running on port ${PORT}`);
});