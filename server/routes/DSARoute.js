import { Router } from 'express';
import { solveDSA } from "../controllers/DSAController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/solve").post(isAuthenticated, solveDSA);

export default router;
