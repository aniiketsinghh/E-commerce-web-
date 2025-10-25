import React, { useState, useContext } from "react";
import { Link } from "react-router";
import AppContext from "../../context/AppContext";

const Card = ({ item }) => {
  const [added, setAdded] = useState(false);
  const { addToCart, isAuthenticated } = useContext(AppContext); // ✅ get addToCart from context

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please login to add items to your cart!");
      return;
    }

    try {
      await addToCart(item); // ✅ actually add to cart
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl shadow-md 
        flex flex-col items-center text-center p-5 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300
        w-70 sm:w-88 md:w-85
      "
    >
      {/* Product Image */}
      <Link to={`/product/${item._id}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-70 h-48 object-cover rounded-xl mb-3"
        />
      </Link>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h2>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-2">
        {item.description.length > 60
          ? item.description.substring(0, 60) + "..."
          : item.description}
      </p>

      {/* Price */}
      <p className="text-2xl font-bold text-gray-900 mb-4 flex items-baseline">
        <span className="text-sm -translate-y-1 mr-0.5">₹</span>
        <span>{item.price.toLocaleString()}</span>
        <span className="text-sm font-normal text-gray-500 ml-1">M.R.P</span>
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`px-5 py-2 rounded-full text-white font-medium transition-all duration-300 focus:ring-2 
          ${
            added
              ? "bg-green-500 hover:bg-green-600 focus:ring-green-300 scale-105"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300"
          }`}
      >
        {added ? "✅ Added!" : "🛒 Add to cart"}
      </button>
    </div>
  );
};

export default Card;
