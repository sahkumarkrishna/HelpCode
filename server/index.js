import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoute from "./routes/UserRoute.js";
import codeReviewRoute from "./routes/CodeRoute.js";
import dsaRoute from "./routes/DSARoute.js";
import chatRoute from "./routes/ChatRoute.js";
import debugRoute from "./routes/DebugRoute.js";
import generatorRoute from "./routes/GeneratorRoute.js";
import resumeRoute from "./routes/ResumeRoute.js";
import visionRoute from "./routes/VisionRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
const allowedOrigins = [
  "https://helpcode-1.onrender.com",
 
  process.env.Frontend_URL,
  process.env.RENDER_EXTERNAL_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, or same-origin)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", UserRoute);
app.use("/api/v1/review", codeReviewRoute);
app.use("/api/dsa", dsaRoute);
app.use("/api/chat", chatRoute);
app.use("/api/debug", debugRoute);
app.use("/api/generator", generatorRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/vision", visionRoute);

// Serve static frontend (Vite build)
const staticPath = path.join(_dirname, "..", "client", "dist");
app.use(express.static(staticPath));

// Fallback route for SPA (non-API)
app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server after DB connects
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
