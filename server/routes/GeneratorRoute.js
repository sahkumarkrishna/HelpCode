import { Router } from 'express';
import { generateAPI } from "../controllers/GeneratorController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/api", isAuthenticated, generateAPI);

export default router;
