import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ShoppingCart, User, LogOut, LogIn, UserPlus } from "lucide-react";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const { isAuthenticated, setUserData, setIsAuthenticated, cart } = useContext(AppContext);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4004/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      setUserData({});
      navigate("/");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchItem.trim()) return;
    navigate(`/product/search/${searchItem}`);
    setSearchItem("");
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys",
    "Books",
    "Grocery",
    "Automotive",
    "More",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  // Calculate total items in cart
  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-gray-100 shadow-sm w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Exphere
          </Link>

          <div className="relative w-1/2">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search products, brands, and more..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              />
              <button className="absolute right-3 top-2.5 text-gray-400">🔍</button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>

              {/* Cart Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <Link
                to="/profile"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
              >
                <User size={20} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
                >
                  <LogIn size={20} />
                  <span className="hidden sm:inline">Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
                >
                  <UserPlus size={20} />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sub Navbar (only show on home page) */}
      {location.pathname === "/" && (
        <div className="bg-white shadow-sm w-full border-t border-gray-100">
          <div className="max-w-7xl mx-auto flex justify-between px-6 py-2 overflow-x-auto">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className="px-4 py-2 rounded-md hover:bg-indigo-50 text-gray-700 font-medium whitespace-nowrap transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
