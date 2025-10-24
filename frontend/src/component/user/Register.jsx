import React, { useState } from "react";
import { Link } from "react-router";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const Register = () => {
 
    const navigate = useNavigate();
   const { userData, setUserData, register } = useContext(AppContext);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });


  // Validation function
  const validate = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Full name is required.";
      else if (value.length < 3) error = "Name must be at least 3 characters.";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Enter a valid email address.";
    }

    if (name === "password") {
      if (!value.trim()) error = "Password is required.";
      else if (value.length < 8)
        error = "Password must be at least 8 characters long.";
      else if (!/[A-Z]/.test(value))
        error = "Password should contain at least one uppercase letter.";
      else if (!/[0-9]/.test(value))
        error = "Password should contain at least one number.";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });

  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validate("name", userData.name),
      email: validate("email", userData.email),
      password: validate("password", userData.password),
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        await register();  //backend call
        navigate("/");
      } catch (err) {
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-indigo-600 text-white flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Exphere</h1>
          <p className="text-lg text-indigo-100 text-center">
            Discover amazing products and deals — your one-stop shop for everything you love.
          </p>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                required
              />
              {errors.password ? (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              ) : (
                <p className="text-gray-500 text-xs mt-1">
                  Password must be at least 8 characters with 1 capital letter & 1 number.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 mt-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          {/* Already Have Account */}
          <p className="text-center text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
