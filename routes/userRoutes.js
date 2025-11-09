import express from 'express';
import { getUserProfile , updateUserProfile } from '../controllers/authController.js';
import { ProtectRoute } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/profile' , ProtectRoute  , getUserProfile)
router.post('/profile' , ProtectRoute  , updateUserProfile)

export default router;