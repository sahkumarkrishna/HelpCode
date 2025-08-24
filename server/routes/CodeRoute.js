import { Router } from 'express';
import { getReview } from "../controllers/CodeController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/code").post(isAuthenticated, getReview);

export default router;    