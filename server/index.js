import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoute from "./routes/UserRoute.js";
import codeReviewRoute from "./routes/CodeRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "https://helpcode-1.onrender.com",
   credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", UserRoute);
app.use("/api/v1/review", codeReviewRoute);

// Serve static frontend (Vite build)
const staticPath = path.join(_dirname, "..", "client", "dist");  // <-- Notice the ".." here
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
