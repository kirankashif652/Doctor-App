import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });

      // ✅ Save all login info to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      // Success notification
      alert("✅ Login successful! Welcome back!");

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      alert("❌ " + errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
              <h1 className="relative text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Welcome Back! 🔐
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Sign in to access your healthcare dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={loginUser} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center space-x-2">
                <span>📧</span>
                <span>Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`w-full bg-gray-700/50 backdrop-blur-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-4 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg placeholder-gray-400`}
                />
                {email && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center space-x-2">
                <span>🔒</span>
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  className={`w-full bg-gray-700/50 backdrop-blur-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-4 pr-12 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg placeholder-gray-400`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-xl">{showPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-sm flex items-center space-x-2">
                  <span>❌</span>
                  <span>{errors.general}</span>
                </p>
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200">
                Forgot your password? 🤔
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing you in...</span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>🚀</span>
                    <span>Sign In</span>
                  </div>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800/50 text-gray-400 rounded-full">OR</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center space-y-4">
            <p className="text-gray-400">
              Don't have an account yet?
            </p>
            <Link
              to="/signup"
              className="group relative overflow-hidden bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>✨</span>
                <span>Create New Account</span>
              </div>
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
            <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
              <span>🎯</span>
              <span>Demo Credentials</span>
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span className="font-mono bg-gray-700/50 px-2 py-1 rounded">admin@test.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>User:</span>
                <span className="font-mono bg-gray-700/50 px-2 py-1 rounded">user@test.com / user123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;