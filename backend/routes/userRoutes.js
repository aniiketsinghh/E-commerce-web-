import express from 'express';
const router=express.Router();
import { registerUser, loginUser, getUsers, profileUser } from "../controllers/userController.js";
import middleware from '../middlewares/auth.middleware.js';

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getusers',getUsers);
router.get('/profile',middleware,profileUser);

export default router