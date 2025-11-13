import express from 'express';
import { ProtectRoute } from '../middlewares/authMiddlewares.js';
import { getChatHistory } from '../controllers/chatController.js';


const router = express.Router();

router.get('/history' , ProtectRoute , getChatHistory);

export default router;