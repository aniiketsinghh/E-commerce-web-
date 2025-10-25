import React, { useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Trash2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, fetchCartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, loading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => { fetchCartItems(); }, []);

  if (loading) return <p className="text-center mt-10">Loading your cart...</p>;
  if (!cart?.items?.length)
    return (
      <div className="flex flex-col items-center mt-20">
        <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="empty cart" className="w-40 h-40 opacity-70" />
        <h2 className="text-xl mt-4">Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/")} className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-md">Shop Now</button>
      </div>
    );

  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
      </div>

      <div className="space-y-4">
        {cart.items.map(item => (
          <div key={item.productId} className="flex justify-between items-center bg-white shadow-md rounded p-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => decreaseQuantity(item.productId)} className="bg-gray-100 p-1 rounded-full"><Minus size={16} /></button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item, 1)} className="bg-gray-100 p-1 rounded-full"><Plus size={16} /></button>
              <button onClick={() => removeFromCart(item.productId)} className="text-red-500 ml-4"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-lg font-bold">Total: ₹{totalPrice}</h2>
        <button onClick={() => navigate("/address")} className="bg-indigo-600 text-white px-6 py-3 rounded-lg">Proceed to Checkout →</button>
      </div>
    </div>
  );
};

export default Cart;
