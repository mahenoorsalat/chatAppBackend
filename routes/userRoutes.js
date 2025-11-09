import express from 'express';
import { getUserProfile } from '../controllers/authController.js';
import { ProtectRoute } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/profile' , ProtectRoute  , getUserProfile)
router.post('/profile' , ProtectRoute  , getUserProfile)

export default router;