import { Router } from 'express';
import multer from 'multer';
import { analyzeResume } from "../controllers/ResumeController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post("/analyze", isAuthenticated, upload.single('resume'), analyzeResume);

export default router;
