import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, role }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-2xl mb-6 border-b border-gray-700">
      <div className="max-w-9xl mx-auto px-5">
        <div className="flex justify-between items-center h-20">
         
          <div className="flex-shrink-0 flex items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
              <Link 
                to="/" 
                className="relative text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 transform hover:scale-110"
              >
                💊 HealthCare
              </Link>
            </div>
          </div>

          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link 
                to="/" 
                className="group relative text-gray-300 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </div>
              </Link>
              
              <Link 
                to="/about" 
                className="group relative text-gray-300 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span>ℹ️</span>
                  <span>About</span>
                </div>
              </Link>
              
              <Link 
                to="/Profile" 
                className="group relative text-gray-300 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span>👤</span>
                  <span>Profile</span>
                </div>
              </Link>
              
              <Link 
                to="/book-doctor" 
                className="group relative text-gray-300 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span>🩺</span>
                  <span>Book Doctor</span>
                </div>
              </Link>
              
              

              {role === "admin" && (
                <>
                  <Link 
                    to="/users" 
                    className="group relative text-gray-300 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>👥</span>
                      <span>Users</span>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/dashboard" 
                    className="group relative text-gray-300 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>📊</span>
                      <span>Dashboard</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isLoggedIn ? (
                <button 
                  onClick={logout}
                  className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <span>🚪</span>
                    <span>Logout</span>
                  </div>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <Link 
                    to="/login"
                    className="group relative overflow-hidden bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>🔐</span>
                      <span>Login</span>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/signup"
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>✨</span>
                      <span>Sign Up</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button  */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white hover:bg-gray-700/50 p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu  */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl mb-4 border border-gray-700/50 shadow-2xl">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white hover:bg-gray-700/30 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl">🏠</span>
                <span>Home</span>
              </Link>
              
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white hover:bg-gray-700/30 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl">ℹ️</span>
                <span>About</span>
              </Link>
              
              <Link 
                to="/Profile" 
                className="text-gray-300 hover:text-white hover:bg-gray-700/30 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl">👤</span>
                <span>Profile</span>
              </Link>
              
              <Link 
                to="/book-doctor" 
                className="text-gray-300 hover:text-white hover:bg-gray-700/30 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl">🩺</span>
                <span>Book Doctor</span>
              </Link>
              
              {/* Admin Only Links - Mobile */}
              {role === "admin" && (
                <>
                  <Link 
                    to="/users" 
                    className="text-gray-300 hover:text-white hover:bg-gray-700/30 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl">👥</span>
                    <span>Users</span>
                  </Link>
                  
                  <Link 
                    to="/dashboard" 
                    className="text-gray-300 hover:text-white hover:bg-gray-700/30 flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl">📊</span>
                    <span>Dashboard</span>
                  </Link>
                </>
              )}

              {/* Mobile Auth Buttons  */}
              <div className="pt-4 mt-4 border-t border-gray-600/50 space-y-3">
                {isLoggedIn ? (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white flex items-center justify-center space-x-3 px-4 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="text-xl">🚪</span>
                    <span>Logout</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login"
                      className="w-full bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white flex items-center justify-center space-x-3 px-4 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 border border-gray-600 shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">🔐</span>
                      <span>Login</span>
                    </Link>
                    
                    <Link 
                      to="/signup"
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white flex items-center justify-center space-x-3 px-4 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">✨</span>
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;