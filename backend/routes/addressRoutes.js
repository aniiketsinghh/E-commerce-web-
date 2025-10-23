import express from 'express';
const router=express.Router();
import { addAddress, getAddresses } from '../controllers/addressController.js';
import  protect  from '../middlewares/auth.middleware.js';

router.post('/add',protect,addAddress);
router.get('/get',protect,getAddresses);

export default router