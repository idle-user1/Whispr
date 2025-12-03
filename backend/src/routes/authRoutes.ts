import { Router } from 'express';
import { login, logout, signup,onboard } from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post("/onboarding",protectRoute, onboard)

export default router;

