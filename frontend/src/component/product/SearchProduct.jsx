import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import AppContext from "../../context/AppContext";
import Card from "./product";

const SearchPage = () => {
  const { id } = useParams(); // this is your search term (like "Laptop")
  const { products } = useContext(AppContext);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!id || !products.length) return;

    // Filter products by title, category, or description
    const searchTerm = id.toLowerCase();
    const result = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    setFiltered(result);
  }, [id, products]);

  return (
    <div className="pt-20 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Search Results for "{id}"
      </h1>

      {filtered.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filtered.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No products found matching "{id}" 😔
        </p>
      )}
    </div>
  );
};

export default SearchPage;
