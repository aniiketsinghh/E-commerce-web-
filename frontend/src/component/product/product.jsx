import React, { useState } from "react";

const Card = ({ item }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl shadow-md 
        flex flex-col items-center text-center p-5 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300
      "
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-48 h-48 object-cover rounded-xl mb-3"
      />

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {item.title}
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-2">
        {item.description.length > 60
          ? item.description.substring(0, 60) + "..."
          : item.description}
      </p>

      {/* Price */}
      <p className="text-lg font-bold text-green-600 mb-3">
        ₹{item.price}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`px-5 py-2 rounded-full text-white font-medium transition-all duration-300 focus:ring-2 
          ${added
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
