import express from 'express';
import { getAllUsers, getUserProfile , updateUserProfile } from '../controllers/authController.js';
import { ProtectRoute } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/profile' , ProtectRoute  , getUserProfile)
router.post('/profile' , ProtectRoute  , updateUserProfile)
router.get('/all' , ProtectRoute  , getAllUsers)

export default router;