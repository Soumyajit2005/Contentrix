const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const userRoutes = require("./routes/user");
const dbInitializer = require("./utils/dbInit");
const storageInitializer = require("./utils/storageInit");

const app = express();
const PORT = process.env.PORT || 5000;

// Auto-initialize database and storage on startup
(async () => {
  try {
    console.log('🔧 Auto-initializing database and storage...');
    await dbInitializer.initialize();
    await storageInitializer.initialize();
    console.log('✅ Auto-initialization completed');
  } catch (error) {
    console.warn('⚠️ Auto-initialization failed (this is normal on first run):', error.message);
    console.log('💡 You can manually initialize by calling POST /api/init/setup');
  }
})();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3001",
      "https://*.vercel.app"
    ],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Import the new projects routes
const projectRoutes = require("./routes/projects");
const initRoutes = require("./routes/init");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes); // Keep existing for backward compatibility
app.use("/api/projects", projectRoutes); // Add new project routes
app.use("/api/user", userRoutes);
app.use("/api/init", initRoutes); // Add initialization routes

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  });

  // Increase timeout for AI operations (2 minutes)
  server.timeout = 120000;
  server.keepAliveTimeout = 120000;
  server.headersTimeout = 120000;
}

// Export for Vercel
module.exports = app;
