import express from 'express';
const router=express.Router();
import { registerUser, loginUser, getUsers, profileUser, checkAuth ,logoutUser} from "../controllers/userController.js";
import middleware from '../middlewares/auth.middleware.js';

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/getusers',getUsers);
router.get('/profile/:id',middleware,profileUser);
router.get("/check-auth", middleware, checkAuth);

export default router