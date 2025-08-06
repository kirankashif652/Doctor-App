import React from "react";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text animate-pulse">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center items-center mb-8 space-x-4">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-8 py-3 bg-gray-800 text-gray-300 font-medium rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200"
          >
            Home Page
          </button>
        </div>

        {/* Floating animation elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;