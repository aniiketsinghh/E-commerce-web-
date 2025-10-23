import AppContext from './AppContext';
import { useState, useEffect } from 'react';
import axios from 'axios';


const AppState=(({children})=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] =  useState(false);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
    quantity: "",
    });

    //fetching all products on home page
    const fetchProducts=async()=>{
        setLoading(true);
        const response= await axios.get("http://localhost:4004/api/products/all",
                            {headers:{
                                'Content-Type':'application/json'
                             },
                            withCredentials: true}       
                );
        setProducts(response.data.products || []);
        setLoading(false);
    }

    //create product function
    const createProduct=async()=>{
        try{
        setLoading(true);
        const response= await axios.post("http://localhost:4004/api/products/create",productData,
                            {headers:{
                                'Content-Type':'application/json'
                             },
                            withCredentials: true }      
                );
         setProductData(response.data.product || {} );
        await fetchProducts();
        setLoading(false);
            }catch(err){
                console.log("Error in creating product from frontend:", err);
                setLoading(false);
            }                     
    }
    useEffect(()=>{
        fetchProducts();
    },[]);

    //fetch a single product by id function
    const fetchProductById=async(id)=>{
        setLoading(true);
        const response= await axios.get(`http://localhost:4004/api/products/product/${id}`,
                            {headers:{
                                'Content-Type':'application/json'
                             },
                            withCredentials: true}       
                );
        setProductData(response.data.product || {});
        setLoading(false);
    }
     
    return(<AppContext.Provider value={{products ,loading, createProduct, setProductData, productData, fetchProductById}}>
        {children}
    </AppContext.Provider> )
})

export default AppState;