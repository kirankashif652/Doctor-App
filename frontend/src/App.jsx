import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import BookDoctor from "./pages/BookDoctors.jsx";
import Users from "./pages/Users.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [user, setUser] = useState(null); // Logged-in user
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <div className="p-4">
      <Navbar isLoggedIn={!!token} role={role} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book-doctor" element={<BookDoctor />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ Pass setUser to login so it can update state */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ If logged in, show profile for all roles */}
        <Route
          path="/profile"
          element={
            token ? (
              <Profile user={user} />
            ) : (
              <div>Please log in to view your profile.</div>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
