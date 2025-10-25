import React, { useEffect, useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { CheckCircle } from "lucide-react";

const OrderSummaryPage = () => {
  const { cart, fetchCartItems, isAuthenticated } = useContext(AppContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4004/api/address/get", {
        withCredentials: true,
      });
      if (res.data.success) setAddresses(res.data.addresses);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
      fetchAddresses();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const totalPrice = cart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
  };

  const handleProceed = () => {
    if (!selectedAddress) return alert("Please select an address!");
    navigate("/payment", { state: { cart, address: selectedAddress } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Summary</h1>

      {/* Cart Items */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
        {cart?.items?.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="divide-y">
            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500 text-sm">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-right">
          <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
        </div>
      </div>

      {/* Address Selection */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Select Shipping Address
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-500">No saved addresses. Please add one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => handleSelectAddress(addr)}
                className={`p-4 rounded-lg border transition cursor-pointer hover:shadow-md ${
                  selectedAddress?._id === addr._id
                    ? "border-indigo-500 bg-indigo-50 shadow-md"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <CheckCircle
                  className={`mb-2 ${
                    selectedAddress?._id === addr._id
                      ? "text-indigo-600"
                      : "text-gray-300"
                  }`}
                  size={20}
                />
                <p className="font-semibold text-gray-800">{addr.fullName}</p>
                <p className="text-gray-600">{addr.phoneNumber}</p>
                <p className="text-gray-600">
                  {addr.address}, {addr.city}, {addr.state} - {addr.postalCode}
                </p>
                <p className="text-gray-600">{addr.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proceed Button */}
      <div className="text-right">
        <button
          onClick={handleProceed}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
