import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        {/* Main Heading with Animation */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
            <h1 className="relative text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-in slide-in-from-top duration-1000">
              About Us ✨
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-1000 delay-300">
            Revolutionizing healthcare access with cutting-edge technology and compassionate care
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 animate-in slide-in-from-left duration-1000 delay-500">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Our Mission 🎯
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We are a passionate team of healthcare professionals and tech innovators dedicated to making quality healthcare accessible to everyone. Our platform bridges the gap between patients and healthcare providers through seamless, efficient, and user-friendly technology.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              No more long waiting times, confusing processes, or missed appointments. We're here to simplify your healthcare journey with just a few clicks.
            </p>
          </div>
          <div className="relative animate-in slide-in-from-right duration-1000 delay-500">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="text-6xl mb-4 text-center">🏥</div>
              <div className="text-center text-gray-300">
                <h3 className="text-2xl font-bold mb-2">Healthcare Excellence</h3>
                <p>Connecting you with the best medical professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom duration-1000 delay-700">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Lightning Fast</h3>
            <p className="text-gray-300 leading-relaxed">
              Book appointments in seconds, not minutes. Our streamlined process gets you connected with healthcare providers instantly.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom duration-1000 delay-900">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🛡️</div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Secure & Private</h3>
            <p className="text-gray-300 leading-relaxed">
              Your health information is protected with bank-level security. Complete privacy and confidentiality guaranteed.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom duration-1000 delay-1100">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💝</div>
            <h3 className="text-2xl font-bold text-pink-400 mb-4">24/7 Support</h3>
            <p className="text-gray-300 leading-relaxed">
              Round-the-clock customer support ensures you're never alone in your healthcare journey. We're here when you need us.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-3xl p-12 mb-20 border border-gray-700/50 shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-1300">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <p className="text-gray-300 font-semibold">Happy Patients</p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <p className="text-gray-300 font-semibold">Expert Doctors</p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <p className="text-gray-300 font-semibold">Specialties</p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                99%
              </div>
              <p className="text-gray-300 font-semibold">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 animate-in slide-in-from-top duration-1000 delay-1500">
            Our Core Values 💫
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/40 shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-left duration-1000 delay-1700">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Trust</h3>
              <p className="text-gray-400 text-sm">Building lasting relationships through transparency and reliability</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/40 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-left duration-1000 delay-1900">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">Constantly evolving to provide cutting-edge healthcare solutions</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/40 shadow-xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-right duration-1000 delay-1900">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">❤️</div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">Compassion</h3>
              <p className="text-gray-400 text-sm">Every interaction is driven by genuine care and empathy</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/40 shadow-xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-right duration-1000 delay-1700">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Excellence</h3>
              <p className="text-gray-400 text-sm">Committed to delivering the highest quality of service</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-2100">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience? 🌟
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have made healthcare simple, fast, and accessible with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>🩺</span>
                <span>Book Your First Appointment</span>
              </div>
            </button>
            
            <button className="group relative overflow-hidden bg-gray-700/50 backdrop-blur-lg hover:bg-gray-600/60 text-gray-200 hover:text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>📞</span>
                <span>Contact Our Team</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;