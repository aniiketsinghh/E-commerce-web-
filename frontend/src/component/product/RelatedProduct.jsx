import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import Card from "./product"; 
import { Link } from "react-router";

function RelatedProduct({ category }) {
  const { products } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    setRelatedProducts(
      products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category, products]);

  if (!relatedProducts.length) return null;

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Related Products
      </h1>

      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto scrollbar-hide px-6 space-x-8">
        
        {relatedProducts.map((product) => (
          <div key={product._id} className="flex-shrink-0">
            <Link to={`/product/${product._id}`}>
            <Card item={product} />
             </Link>
          </div>
        ))}
       
      </div>
    </div>
  );
}

export default RelatedProduct;
