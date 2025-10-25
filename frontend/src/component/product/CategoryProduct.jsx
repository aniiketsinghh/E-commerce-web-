import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import AppContext from "../../context/AppContext";
import { Link } from "react-router";

const CategoryProduct = () => {
  const { category } = useParams(); // get category from URL
  const { products,  loading, fetchProducts } = useContext(AppContext);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch all products first
        await fetchProducts(); 

        // Filter products locally by category (if backend doesn't have category route)
        const filtered = products.filter(
          (prod) => prod.category.toLowerCase() === category.toLowerCase()
        );
        setCategoryProducts(filtered);
      } catch (err) {
        console.log("Error fetching category products:", err);
      }
    };

    fetchCategoryProducts();
  }, [category, products]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!categoryProducts.length)
    return <p className="text-center text-gray-500">No products found in {category}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoryProducts.map((prod) => (
        <div key={prod._id} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
          <img src={prod.image} alt={prod.title} className="h-48 w-full object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold mb-2">{prod.title}</h3>
          <p className="text-gray-600 mb-2">{prod.description}</p>
          <p className="text-indigo-600 font-bold mb-4">${prod.price}</p>
          <Link
            to={`/product/${prod._id}`}
            className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center"
          >
            View Product
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryProduct;
