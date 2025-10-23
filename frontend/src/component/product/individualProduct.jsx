//detail project look like

import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router";
import AppContext from "../../context/AppContext";
import RelatedProduct from "./RelatedProduct";

const IndividualProduct = () => {
  const { id } = useParams();
  const { fetchProductById, productData, loading } = useContext(AppContext);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  if (loading || !productData.title) return <p className="text-center mt-10">Loading...</p>;

  return (<>
    <div className="max-w-6xl  mx-auto mt-30 bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-10 items-center">
      
      {/* Left: Product Image */}
      <img
        src={productData.image}
        alt={productData.title}
        className="w-full sm:w-96 h-96 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />

      {/* Right: Product Info */}
      <div className="flex-1 flex flex-col justify-start text-center sm:text-left">
        <h1 className="text-3xl  mb-4 text-gray-800">{productData.title}</h1>
        <p className="text-gray-600 mb-4">{productData.description}</p>
       <p className="text-2xl  text-gray-900 mb-4 flex items-baseline gap-1">
  <span className="text-sm -translate-y-1 inline-block">₹</span>
  <span>{productData.price.toLocaleString()}</span>
  <span className="text-sm font-normal text-gray-500 ml-2">M.R.P</span>
</p>

          <p className="text-2xl font-bold text-gray-600 mb-4">{productData.category}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
            Add to Cart
          </button>

          <Link
            to="/"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-center"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>

    <RelatedProduct category={productData.category}/>
    </>
  );
};

export default IndividualProduct;
