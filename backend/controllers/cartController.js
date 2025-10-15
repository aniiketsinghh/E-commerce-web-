import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import authMiddleware from "../middlewares/auth.middleware.js";

export const addToCart=async(req,res)=>{
    try{
        const {productId,title,price,quantity,image}=req.body;
        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"user not found",success:false});
        }
        let cart=await Cart.findOne({userId});
        if(!cart){
            cart=new Cart({userId,items:[]});
        }
        const itemIndex=cart.items.findIndex(item=>item.productId.toString()===productId);
        if(itemIndex>-1){
            cart.items[itemIndex].quantity+=Number(quantity);
        }else{
            const newItem={productId,title,price,quantity,image};
            cart.items.push(newItem);
        }
        await cart.save();
        res.status(200).json({message:"product added to cart",cart,success:true});
    }catch(err){
        res.status(500).json({message:"error in adding to cart",error:err.message,success:false});
    }
}

export const getCartItems=async(req,res)=>{
    try{
        const userId=req.user._id;
        const cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:"cart not found",success:false});
        }
       return res.status(200).json({message:"cart fetched successfully",cart,success:true});
    }catch(err){
        res.status(500).json({message:"error in fetching cart",error:err.message,success:false});
    }
}

export const removeFromCart=async(req,res)=>{
    try{
        const {productId}=req.params;
        const userId=req.user._id;
        const cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:"cart not found",success:false});
        }
        cart.items=cart.items.filter(item=>item.productId.toString()!==productId);
        await cart.save();
        res.status(200).json({message:"item removed from cart",cart,success:true});
    }catch(err){
        res.status(500).json({message:"error in removing from cart",error:err.message,success:false});
    }
}

export const clearCart=async(req,res)=>{
    try{
        const userId=req.user._id;
        const cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:"cart not found",success:false});
        }
        cart.items=[];
        await cart.save();
        res.status(200).json({message:"cart cleared",cart,success:true});
    }catch(err){
        res.status(500).json({message:"error in clearing cart",error:err.message,success:false});
    }
}

export const decreaseItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const  userId  = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", success: false });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart", success: false });
    }

    const qtyToRemove = Number(quantity) || 1;
    const currentQty = cart.items[itemIndex].quantity;

    if (currentQty > qtyToRemove) {
      cart.items[itemIndex].quantity -= qtyToRemove;
    } else {
      // Remove the item entirely if quantity reaches 0
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).json({ message: "Item quantity decreased", cart, success: true });
  } catch (err) {
    res.status(500).json({
      message: "Error in decreasing item quantity",
      error: err.message,
      success: false,
    });
  }
};

       