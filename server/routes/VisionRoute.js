import { Router } from 'express';
import multer from 'multer';
import { analyzeImage } from "../controllers/VisionController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post("/analyze", isAuthenticated, upload.single('image'), analyzeImage);

export default router;
