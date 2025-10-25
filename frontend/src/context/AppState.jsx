import AppContext from './AppContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AppState = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({ title: "", description: "", price: "", image: "", category: "", quantity: "" });

  // REGISTER
  const register = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4004/api/auth/register", userData, { withCredentials: true });
      setUserData(res.data.user || {});
      if (res.data.token) setIsAuthenticated(true);
      setLoading(false);
    } catch (err) { console.log(err); setLoading(false); }
  };

  // LOGIN
  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4004/api/auth/login", loginData, { withCredentials: true });
      setUserData(res.data.user || {});
      if (res.data.token) setIsAuthenticated(true);
      setLoading(false);
    } catch (err) { console.log(err); setLoading(false); }
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4004/api/products/all", { withCredentials: true });
      setProducts(res.data.products || []);
      setLoading(false);
    } catch (err) { console.log(err); setLoading(false); }
  };

  // FETCH CART ITEMS
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4004/api/cart/user", { withCredentials: true });
      setCart(res.data.cart || { items: [] });
      setLoading(false);
    } catch (err) { console.log(err); setLoading(false); }
  };

  // ADD TO CART (frontend sends full product object)
  const addToCart = async (product, quantity = 1) => {
    try {
      const payload = {
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      };

      const res = await axios.post("http://localhost:4004/api/cart/add", payload, { withCredentials: true });

      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // REMOVE ITEM
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:4004/api/cart/remove/${productId}`, { withCredentials: true });
      setCart(res.data.cart);
    } catch (err) { console.log(err); }
  };

  // DECREASE QUANTITY
  const decreaseQuantity = async (productId) => {
    try {
      const res = await axios.put("http://localhost:4004/api/cart/decrease", { productId, quantity: 1 }, { withCredentials: true });
      setCart(res.data.cart);
    } catch (err) { console.log(err); }
  };

  // CLEAR CART
  const clearCart = async () => {
    try {
      const res = await axios.delete("http://localhost:4004/api/cart/clear", { withCredentials: true });
      setCart(res.data.cart);
    } catch (err) { console.log(err); }
  };

  // AUTH CHECK
  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:4004/api/auth/check-auth", { withCredentials: true });
      if (res.data.success) { setUserData(res.data.user); setIsAuthenticated(true); } 
      else setIsAuthenticated(false);
    } catch (err) { console.log(err); setIsAuthenticated(false); }
  };

  useEffect(() => { 
    checkAuth(); 
    fetchProducts(); 
    fetchCartItems();
  }, []);

  return (
    <AppContext.Provider value={{
      userData, setUserData,
      loginData, setLoginData,
      isAuthenticated, setIsAuthenticated,
      register, login,
      products, loading,
      createProduct: async () => {}, 
      productData, setProductData,
      cart, fetchCartItems, addToCart, removeFromCart, decreaseQuantity, clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
