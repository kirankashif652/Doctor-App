import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const API = "http://localhost:5000/api"; // ✅ Update this if your backend is hosted

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLoggedInUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API}/users/online`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Something went wrong while loading users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Online Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && users.length === 0 && (
        <p className="text-gray-600">No users are currently logged in.</p>
      )}

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center p-4 bg-white shadow rounded-md"
          >
            <FaUserCircle className="text-3xl text-blue-500 mr-4" />
            <div>
              <p className="font-semibold text-lg">{user.name || "Unnamed User"}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-sm text-green-600">Role: {user.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
