import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Backend API URL
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      await axios.post(`${API}/auth/signup`, { name: name.trim(), email, password });
      alert("🎉 Account created successfully! Please login to continue.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Signup failed";
      alert("❌ Error: " + msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  // Handle password change with strength check
  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
  };

  // Get password strength color and text
  const getPasswordStrengthInfo = () => {
    const strengthLevels = [
      { color: 'text-red-400', text: 'Very Weak', bgColor: 'bg-red-500' },
      { color: 'text-orange-400', text: 'Weak', bgColor: 'bg-orange-500' },
      { color: 'text-yellow-400', text: 'Fair', bgColor: 'bg-yellow-500' },
      { color: 'text-blue-400', text: 'Good', bgColor: 'bg-blue-500' },
      { color: 'text-green-400', text: 'Strong', bgColor: 'bg-green-500' }
    ];
    return strengthLevels[passwordStrength - 1] || strengthLevels[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Signup Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
              <h1 className="relative text-4xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Join Us Today! ✨
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Create your account and start your healthcare journey
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={signup} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center space-x-2">
                <span>👤</span>
                <span>Full Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={`w-full bg-gray-700/50 backdrop-blur-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-4 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg placeholder-gray-400`}
                />
                {name && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
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
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Password Strength:</span>
                    <span className={`text-sm font-semibold ${getPasswordStrengthInfo().color}`}>
                      {getPasswordStrengthInfo().text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthInfo().bgColor}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center space-x-2">
                <span>🔐</span>
                <span>Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  className={`w-full bg-gray-700/50 backdrop-blur-lg border ${
                    errors.confirmPassword ? 'border-red-500' : 
                    confirmPassword && password === confirmPassword ? 'border-green-500' : 'border-gray-600'
                  } text-white px-4 py-4 pr-12 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg placeholder-gray-400`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-xl">{showConfirmPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-400 text-sm flex items-center space-x-1">
                  <span>✅</span>
                  <span>Passwords match!</span>
                </p>
              )}
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.confirmPassword}</span>
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

            {/* Terms and Conditions */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-blue-300 text-sm flex items-start space-x-2">
                <span className="text-lg">📋</span>
                <span>By creating an account, you agree to our Terms of Service and Privacy Policy</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 text-white px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating your account...</span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>🚀</span>
                    <span>Create Account</span>
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

          {/* Login Link */}
          <div className="text-center space-y-4">
            <p className="text-gray-400">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="group relative overflow-hidden bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>🔐</span>
                <span>Sign In Instead</span>
              </div>
            </Link>
          </div>

          {/* Password Requirements */}
          <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
              <span>💡</span>
              <span>Password Tips</span>
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span className={password.length >= 8 ? "text-green-400" : "text-gray-500"}>
                  {password.length >= 8 ? "✅" : "⭕"}
                </span>
                <span>At least 8 characters long</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={/[a-z]/.test(password) ? "text-green-400" : "text-gray-500"}>
                  {/[a-z]/.test(password) ? "✅" : "⭕"}
                </span>
                <span>Contains lowercase letter</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={/[A-Z]/.test(password) ? "text-green-400" : "text-gray-500"}>
                  {/[A-Z]/.test(password) ? "✅" : "⭕"}
                </span>
                <span>Contains uppercase letter</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={/[0-9]/.test(password) ? "text-green-400" : "text-gray-500"}>
                  {/[0-9]/.test(password) ? "✅" : "⭕"}
                </span>
                <span>Contains number</span>
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

export default Signup;