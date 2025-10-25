import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const AddressPage = () => {
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Fetch user addresses
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

  // Add new address
  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4004/api/address/add",
        newAddress,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAddresses([res.data.address, ...addresses]);
        setNewAddress({
          fullName: "",
          phoneNumber: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Remove an address
  const removeAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:4004/api/address/${id}`, {
        withCredentials: true,
      });
      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Use old address and navigate to checkout
 

  useEffect(() => {
    if (isAuthenticated) fetchAddresses();
  }, [isAuthenticated]);

   const selectOldAddress = (addr) => {
    setNewAddress({
      fullName: addr.fullName,
      phoneNumber: addr.phoneNumber,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
    });
    navigate("/order-summary"); // Navigate immediately to checkout
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Your Addresses
      </h1>

      {/* Use Old Address Buttons */}
      {addresses.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-3">
          {addresses.map((addr) => (
            <button
              key={addr._id}
              onClick={() => selectOldAddress(addr)}
              className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-200 transition shadow-sm hover:shadow-md"
            >
              {addr.city}, {addr.state}
            </button>
          ))}
        </div>
      )}

      {/* New Address Form */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add New Address
        </h2>
        <form
          onSubmit={addAddress}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { label: "Full Name", name: "fullName" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Postal Code", name: "postalCode" },
            { label: "Country", name: "country" },
          ].map((field) => (
            <input
              key={field.name}
              type="text"
              placeholder={field.label}
              value={newAddress[field.name]}
              onChange={(e) =>
                setNewAddress({ ...newAddress, [field.name]: e.target.value })
              }
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          ))}
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
          >
            Add Address
          </button>
        </form>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-gray-500 text-center col-span-2">
            Loading addresses...
          </p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-500 text-center col-span-2">
            No addresses found.
          </p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition relative"
            >
              <button
                onClick={() => removeAddress(addr._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
              <h3 className="font-semibold text-gray-800">{addr.fullName}</h3>
              <p className="text-gray-600">{addr.phoneNumber}</p>
              <p className="text-gray-600">
                {addr.address}, {addr.city}, {addr.state} - {addr.postalCode}
              </p>
              <p className="text-gray-600">{addr.country}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressPage;
