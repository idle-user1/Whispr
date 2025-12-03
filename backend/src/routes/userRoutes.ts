import { Router, type Request, type Response } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/userController.js';
import { send } from 'process';

const router = Router();
router.use(protectRoute)
router.get("/getMyFriends",getMyFriends)
router.get("/",getRecommendedUsers)

router.post("sendFriendRequest/:id",sendFriendRequest); 
export default router;
