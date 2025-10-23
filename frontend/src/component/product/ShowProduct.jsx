import { useContext } from "react";
import AppContext from "../../context/AppContext";
import Card from "./product";

const ShowProduct = () => {
  const { products, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Our Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {products?.map((product) => (
          <Card key={product._id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
