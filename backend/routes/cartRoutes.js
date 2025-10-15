import express from "express";
const router=express.Router();
import { addToCart, getCartItems, removeFromCart, decreaseItemQuantity,clearCart} from "../controllers/cartController.js";
import middleware from '../middlewares/auth.middleware.js';

router.post("/add",middleware,addToCart);
router.get("/user",middleware,getCartItems);
router.delete("/remove/:productId",middleware,removeFromCart);
router.put("/decrease",middleware,decreaseItemQuantity);
router.delete("/clear",middleware,clearCart);

export default router;