import express from 'express';
const router=express.Router();
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import middleware from '../middlewares/auth.middleware.js';

router.post('/create',createProduct);
router.get('/all',getAllProducts);
router.get('/product/:id',getProductById);
router.put('/update/:id',middleware,updateProduct);
router.delete('/delete/:id',middleware,deleteProduct);

export default router