import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-3xl animate-pulse"></div>
              <h1 className="relative text-5xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 animate-in slide-in-from-top duration-1000">
                Welcome to HealthCare ✨
              </h1>
            </div>
            
            <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-in slide-in-from-bottom duration-1000 delay-300">
              Your health, our priority. Book appointments with expert doctors in just a few clicks
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-in slide-in-from-bottom duration-1000 delay-500">
              <Link 
                to="/book-doctor"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 ease-in-out transform hover:scale-110 shadow-2xl hover:shadow-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <span className="text-2xl">🩺</span>
                  <span>Book Doctor Now</span>
                </div>
              </Link>
              
              <Link 
                to="/about"
                className="group relative overflow-hidden bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 ease-in-out transform hover:scale-110 border border-gray-600 hover:border-gray-500 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <span className="text-2xl">ℹ️</span>
                  <span>Learn More</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-in slide-in-from-bottom duration-1000 delay-700">
            <div className="group bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🏥</div>
                <h3 className="text-3xl font-black text-blue-400 mb-2">500+</h3>
                <p className="text-gray-300 font-semibold">Expert Doctors</p>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
                <h3 className="text-3xl font-black text-emerald-400 mb-2">10K+</h3>
                <p className="text-gray-300 font-semibold">Happy Patients</p>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
                <h3 className="text-3xl font-black text-purple-400 mb-2">4.9</h3>
                <p className="text-gray-300 font-semibold">Rating Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-8 animate-in slide-in-from-top duration-1000">
              Why Choose Us? 🌟
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-in slide-in-from-bottom duration-1000 delay-300">
              Experience healthcare like never before with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-left duration-1000 delay-500">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">⚡</div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">Instant Booking</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Book appointments in seconds with our streamlined process. No waiting, no hassles - just quick and easy scheduling.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom duration-1000 delay-700">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">🛡️</div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4 text-center">Secure & Private</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Your health information is protected with bank-level security. Complete privacy and confidentiality guaranteed.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-right duration-1000 delay-900">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">👨‍⚕️</div>
              <h3 className="text-2xl font-bold text-pink-400 mb-4 text-center">Expert Doctors</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Access to qualified healthcare professionals across all specialties. Quality care from trusted experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-8">
              How It Works 🚀
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group animate-in slide-in-from-bottom duration-1000 delay-1100">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                  1️⃣
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                  ✓
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Choose Doctor</h3>
              <p className="text-gray-400">Browse and select from our expert healthcare professionals</p>
            </div>

            <div className="text-center group animate-in slide-in-from-bottom duration-1000 delay-1300">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                  2️⃣
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                  ✓
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pick Date</h3>
              <p className="text-gray-400">Select your preferred date and time slot</p>
            </div>

            <div className="text-center group animate-in slide-in-from-bottom duration-1000 delay-1500">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                  3️⃣
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                  ✓
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Book Now</h3>
              <p className="text-gray-400">Confirm your appointment with a single click</p>
            </div>

            <div className="text-center group animate-in slide-in-from-bottom duration-1000 delay-1700">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                  4️⃣
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                  ✓
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Care</h3>
              <p className="text-gray-400">Receive quality healthcare from our professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl text-center animate-in slide-in-from-bottom duration-1000 delay-1900">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started? 💫
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their healthcare needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/book-doctor"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <span>🚀</span>
                  <span>Book Your First Appointment</span>
                </div>
              </Link>
              
              <Link 
                to="/signup"
                className="group relative overflow-hidden bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <span>✨</span>
                  <span>Create Account</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            💊 HealthCare
          </div>
          <p className="text-gray-400 mb-6">Making healthcare accessible for everyone</p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;