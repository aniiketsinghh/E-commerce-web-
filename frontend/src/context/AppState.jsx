import AppContext from './AppContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AppState = ({ children }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        quantity: "",
    });

    // REGISTER
    const register = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:4004/api/auth/register",
                userData,
                { withCredentials: true }
            );
            setUserData(response.data.user || {});
            if (response.data.token) setIsAuthenticated(true);
            setLoading(false);
        } catch (err) {
            console.log("Register Error:", err);
            setLoading(false);
        }
    };

    // LOGIN
    const login = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:4004/api/auth/login",
                loginData,
                { withCredentials: true }
            );
            setUserData(response.data.user || {});
            if (response.data.token) setIsAuthenticated(true);
            setLoading(false);
        } catch (err) {
            console.log("Login Error:", err);
            setLoading(false);
        }
    };



    // FETCH ALL PRODUCTS
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:4004/api/products/all",
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setProducts(response.data.products || []);
            setLoading(false);
        } catch (err) {
            console.log("Fetch Products Error:", err);
            setLoading(false);
        }
    };

    // CREATE PRODUCT
    const createProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:4004/api/products/create",
                productData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setProductData(response.data.product || {});
            await fetchProducts();
            setLoading(false);
        } catch (err) {
            console.log("Create Product Error:", err);
            setLoading(false);
        }
    };

    // FETCH PRODUCT BY ID
    const fetchProductById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:4004/api/products/product/${id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setProductData(response.data.product || {});
            setLoading(false);
        } catch (err) {
            console.log("Fetch Product Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                loginData,
                setLoginData,
                isAuthenticated,
                setIsAuthenticated,
                register,
                login,
                
                products,
                loading,
                createProduct,
                setProductData,
                productData,
                fetchProductById
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppState;
