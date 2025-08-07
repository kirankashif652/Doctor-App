import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalDoctors: 0,
    pendingAppointments: 0
  });
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [filter, setFilter] = useState('all'); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("🚫 Access denied. Admins only.");
      navigate("/not-allowed");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch appointments and doctors simultaneously
      const [appointmentsRes, doctorsRes] = await Promise.all([
        axios.get(`${API}/appointments`),
        axios.get(`${API}/doctors`)
      ]);

      setAppointments(appointmentsRes.data);
      setDoctors(doctorsRes.data);

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointmentsRes.data.filter(app => app.date === today).length;
      
      setStats({
        totalAppointments: appointmentsRes.data.length,
        todayAppointments,
        totalDoctors: doctorsRes.data.length,
        pendingAppointments: appointmentsRes.data.filter(app => new Date(app.date) >= new Date()).length
      });

    } catch (err) {
      console.error("Data fetch error:", err);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Get doctor name by ID
  const getDoctorName = (id) => {
    const doctor = doctors.find((doc) => doc._id === id);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  // Get doctor specialization by ID
  const getDoctorSpecialization = (id) => {
    const doctor = doctors.find((doc) => doc._id === id);
    return doctor ? doctor.specialization : "General";
  };

  // Delete appointment
  const handleDelete = async (id, doctorName, date) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the appointment with Dr. ${doctorName} on ${date}?`
    );
    
    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);
      await axios.delete(`${API}/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalAppointments: prev.totalAppointments - 1
      }));

      alert("✅ Appointment deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete appointment.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Edit appointment
  const handleEdit = (app) => {
    alert(`🔧 Edit functionality coming soon for appointment: ${app._id}`);
   
  };

  // Filter appointments
  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case 'today':
        return appointments.filter(app => app.date === today);
      case 'upcoming':
        return appointments.filter(app => new Date(app.date) > new Date());
      case 'past':
        return appointments.filter(app => new Date(app.date) < new Date());
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">📊</span>
            </div>
          </div>
          <p className="text-xl text-gray-300 font-semibold mt-4">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
            <h1 className="relative text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Admin Dashboard 📊
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage all appointments and monitor healthcare operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 font-medium">Total Appointments</p>
                <p className="text-3xl font-black text-white mt-2">{stats.totalAppointments}</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 font-medium">Today's Appointments</p>
                <p className="text-3xl font-black text-white mt-2">{stats.todayAppointments}</p>
              </div>
              <div className="text-4xl">⏰</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 font-medium">Total Doctors</p>
                <p className="text-3xl font-black text-white mt-2">{stats.totalDoctors}</p>
              </div>
              <div className="text-4xl">👨‍⚕️</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/30 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 font-medium">Pending Appointments</p>
                <p className="text-3xl font-black text-white mt-2">{stats.pendingAppointments}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: 'all', label: 'All Appointments', icon: '📋' },
            { key: 'today', label: 'Today', icon: '📅' },
            { key: 'upcoming', label: 'Upcoming', icon: '🔮' },
            { key: 'past', label: 'Past', icon: '📜' }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`group relative overflow-hidden px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
                filter === key
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-700/50 backdrop-blur-lg text-gray-300 hover:bg-gray-600/60 border border-gray-600'
              }`}
            >
              <div className="relative flex items-center space-x-2">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>📋</span>
              <span>Appointments ({filteredAppointments.length})</span>
            </h2>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No Appointments Found</h3>
              <p className="text-gray-400 text-lg">
                {filter === 'all' ? 'No appointments have been booked yet.' : `No ${filter} appointments found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((app, index) => {
                const appointmentDate = new Date(app.date);
                const today = new Date();
                const isToday = app.date === today.toISOString().split('T')[0];
                const isPast = appointmentDate < today;
                const isUpcoming = appointmentDate > today;

                return (
                  <div
                    key={app._id}
                    className="group bg-gradient-to-r from-gray-700/30 to-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-600/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] animate-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Appointment Info */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl text-white font-bold shadow-lg">
                              👨‍⚕️
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-bold text-white">
                                Dr. {getDoctorName(app.doctorId)}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                isToday ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                isPast ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              }`}>
                                {isToday ? '🔥 Today' : isPast ? '📜 Past' : '🔮 Upcoming'}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-gray-300">
                                <span>🏥</span>
                                <span className="font-medium">{getDoctorSpecialization(app.doctorId)}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-300">
                                <span>📅</span>
                                <span className="font-medium">
                                  {new Date(app.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-400">
                                <span>🆔</span>
                                <span className="text-sm font-mono">{app._id}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(app)}
                          className="group relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                          <div className="relative flex items-center space-x-2">
                            <span>✏️</span>
                            <span>Edit</span>
                          </div>
                        </button>

                        <button
                          onClick={() => handleDelete(app._id, getDoctorName(app.doctorId), app.date)}
                          disabled={deleteLoading === app._id}
                          className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleteLoading === app._id ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Deleting...</span>
                            </div>
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                              <div className="relative flex items-center space-x-2">
                                <span>🗑️</span>
                                <span>Delete</span>
                              </div>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center space-x-2">
            <span>⚡</span>
            <span>Quick Actions</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative flex items-center space-x-2">
                <span>👨‍⚕️</span>
                <span>Add New Doctor</span>
              </div>
            </button>
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative flex items-center space-x-2">
                <span>📊</span>
                <span>View Reports</span>
              </div>
            </button>
            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="relative flex items-center space-x-2">
                <span>⚙️</span>
                <span>Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;