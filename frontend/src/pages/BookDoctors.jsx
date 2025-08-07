import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function BookDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(null);

  // ✅ Fetch doctors list
  useEffect(() => {
    axios
      .get(`${API}/doctors`)
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Doctors fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Book doctor with auth token
  const book = async (doctorId, doctorName) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first! 🔐");
    if (!date) return alert("Please select a date! 📅");

    setBookingLoading(doctorId);
    try {
      await axios.post(
        `${API}/appointments`,
        { doctorId, date },
        {
          headers: { Authorization: token },
        }
      );
      alert(`✅ Appointment booked successfully with Dr. ${doctorName}!`);
      setDate(""); 
    } catch (error) {
      console.error("Booking error:", error);
      alert("❌ Booking failed. Please try again.");
    } finally {
      setBookingLoading(null);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
            <h1 className="relative text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Book Your Doctor 🩺
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our expert healthcare professionals and schedule your appointment
          </p>
        </div>

        {/* Date Picker Section */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-700/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📅</span>
              <label className="text-xl font-semibold text-gray-200">Select Appointment Date:</label>
            </div>
            <div className="relative">
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-700/50 backdrop-blur-lg border border-gray-600 text-white px-6 py-4 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              {date && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
          {!date && (
            <p className="text-center text-gray-400 mt-4 flex items-center justify-center space-x-2">
              <span>⚡</span>
              <span>Please select a date to proceed with booking</span>
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
            </div>
            <p className="ml-4 text-xl text-gray-300 font-semibold">Loading doctors...</p>
          </div>
        )}

        {/* No Doctors Available */}
        {!loading && doctors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">👨‍⚕️</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">No Doctors Available</h3>
            <p className="text-gray-400 text-lg">Please check back later for available appointments.</p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && doctors.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc, index) => (
              <div
                key={doc._id}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Doctor Avatar */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl text-white font-bold shadow-lg">
                      👨‍⚕️
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white mb-1">Dr. {doc.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">🎯</span>
                      <span className="text-purple-400 font-medium">{doc.specialization}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span className="text-lg">⭐</span>
                    <span className="font-medium">4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span className="text-lg">🕒</span>
                    <span className="font-medium">Available Today</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span className="text-lg">💰</span>
                    <span className="font-medium">Consultation Fee: $50</span>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-3 mb-6 border border-emerald-500/30">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">🏆</span>
                    <span className="text-emerald-400 font-semibold">10+ Years Experience</span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => book(doc._id, doc.name)}
                  disabled={!date || bookingLoading === doc._id}
                  className={`w-full group relative overflow-hidden ${
                    !date
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                  } text-white px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 ease-in-out transform ${
                    !date ? "" : "hover:scale-105"
                  } shadow-xl ${!date ? "" : "hover:shadow-2xl"}`}
                >
                  {bookingLoading === doc._id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking...</span>
                    </div>
                  ) : !date ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>📅</span>
                      <span>Select Date First</span>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-2">
                        <span>🩺</span>
                        <span>Book Appointment</span>
                      </div>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <span>💡</span>
              <span>Booking Information</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-300">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">⏰</span>
                <p className="font-medium">Same Day Appointments</p>
                <p className="text-sm text-gray-400">Book and get appointment today</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">🔒</span>
                <p className="font-medium">Secure & Private</p>
                <p className="text-sm text-gray-400">Your health data is protected</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">📱</span>
                <p className="font-medium">Easy Rescheduling</p>
                <p className="text-sm text-gray-400">Change appointments anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDoctor;