import { Router } from 'express';
import { fixBug } from "../controllers/DebugController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/fix", isAuthenticated, fixBug);

export default router;
