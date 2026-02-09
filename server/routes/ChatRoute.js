import { Router } from 'express';
import { getConversations, getConversation, createConversation, deleteConversation, sendMessage } from "../controllers/ChatController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/conversations", isAuthenticated, getConversations);
router.get("/:chatId", isAuthenticated, getConversation);
router.post("/new", isAuthenticated, createConversation);
router.delete("/:chatId", isAuthenticated, deleteConversation);
router.post("/message", isAuthenticated, sendMessage);

export default router;
