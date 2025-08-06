import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Settings, Edit3, LogOut, ArrowLeft } from "lucide-react";

function Profile() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    role: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on component mount  
  useEffect(() => {
    try {
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const role = localStorage.getItem("role");

      if (email && name) {
        setUser({ email, name, role: role || "user" });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("LocalStorage not available", error);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.clear();
      setUser({ email: "", name: "", role: "" });
      setIsLoggedIn(false);
      window.location.href = "/login";
    } catch (error) {
      console.log("Error clearing localStorage", error);
    }
  };

  if (!isLoggedIn || !user.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowLeft className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-6">Please login to view your profile</p>
            <button 
              onClick={() => window.location.href = "/login"}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-gray-700 backdrop-blur-sm relative">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-white opacity-90">Profile</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
              onClick={() => alert("Settings feature coming soon!")}
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl text-white font-bold shadow-lg ring-4 ring-gray-700">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200 shadow-lg"
              onClick={() => alert("Edit avatar feature coming soon!")}
            >
              <Edit3 className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">{user.name || "User"}</h2>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <p className="text-blue-400 capitalize font-medium">{user.role || "user"}</p>
          </div>

          <div className="w-full bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-inner">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-gray-700 rounded-xl">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-300 text-sm uppercase tracking-wide">Email</span>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-gray-700 rounded-xl">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-300 text-sm uppercase tracking-wide">Role</span>
                  <p className="text-white font-medium capitalize">{user.role || "user"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 space-y-3">
            <button 
              onClick={() => alert("Edit profile feature coming soon!")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 border border-red-500"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}

export default Profile;
