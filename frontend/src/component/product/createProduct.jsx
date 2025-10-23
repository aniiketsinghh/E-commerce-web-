import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const CreateProductForm = () => {
  const { createProduct, setProductData, productData, loading } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black/5 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full sm:w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Create Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={productData.title}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={productData.description}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            rows={3}
            required
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productData.image}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={productData.quantity}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
