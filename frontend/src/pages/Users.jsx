import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const API = "http://localhost:5000/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not authorized. Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      if (err?.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
      } else {
        setError("Something went wrong while loading users.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${API}/users/${userId}/status`,
        { status: currentStatus === "active" ? "blocked" : "active" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state after change
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: response.data.status } : user
        )
      );
    } catch (err) {
      console.error("Failed to update user status:", err);
      alert("Failed to update user status");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">All Users</h2>

      {loading && <p className="text-blue-400">Loading users...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-gray-400">No users found in the database.</p>
      )}

      <ul className="space-y-4 max-w-3xl mx-auto">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between p-4 bg-gray-800 shadow rounded-md"
          >
            <div className="flex items-center">
              <FaUserCircle className="text-3xl text-blue-400 mr-4" />
              <div>
                <p className="font-semibold text-lg">
                  {user.name || user.fullName || "Unnamed User"}
                </p>
                <p className="text-gray-300 text-sm">{user.email || "No email provided"}</p>
                <p className="text-sm text-green-400">Role: {user.role || "User"}</p>
                <p className="text-sm text-yellow-400 capitalize">Status: {user.status || "unknown"}</p>
              </div>
            </div>
            <button
              onClick={() => toggleUserStatus(user._id, user.status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                user.status === "active"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {user.status === "active" ? "Block" : "Activate"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
