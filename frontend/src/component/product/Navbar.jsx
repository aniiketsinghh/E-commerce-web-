import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

const Navbar = () => {
  const { isAuthenticated } = useContext(AppContext);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchItem}`);
    setSearchItem("");
  }
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Logo / Heading */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Exphere
        </Link>

        {/* Center: Search bar */}
        
        <div className="relative w-1/2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search products, brands, and more..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
          <button className="absolute right-3 top-2.5 text-gray-400">
            🔍
          </button>
          </form>
        </div>
        

        {/* Right: Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          
          {isAuthenticated && (<>
          <Link
            to="/profile"
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
          >
            <User size={20} />
            <span className="hidden sm:inline">Profile</span>
          </Link>
          </>)}
          
      {!isAuthenticated  && (<>
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
          </>)}

          {isAuthenticated && (<>
             <button className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
      
          </>)}
         
        
      
          
        </div>
      </div>
    </nav>
  );
};
export default Navbar;


