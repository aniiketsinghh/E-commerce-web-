import React, { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
   const { loginData, setLoginData, login} = useContext(AppContext);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validate = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Enter a valid email address.";
    }

    if (name === "password") {
      if (!value.trim()) error = "Password is required.";
      else if (value.length < 8)
        error = "Password must be at least 8 characters long.";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      
      email: validate("email", loginData.email),
      password: validate("password", loginData.password),
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        await login();  //backend call
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
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-lg text-indigo-100 text-center">
            Log in to your Exphere account and continue shopping the smart way.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to Exphere
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
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
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none pr-10 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password ? (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              ) : (
                <p className="text-gray-500 text-xs mt-1">
                  Must be at least 8 characters long.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 mt-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
