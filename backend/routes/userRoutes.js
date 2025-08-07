import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// ✅ [GET] /api/users - Get ALL users
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found in the database" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching all users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

// ✅ [GET] /api/users/online - Get ONLY online users
router.get("/online", protect, async (req, res) => {
  try {
    const onlineUsers = await User.find({ isLoggedIn: true }, "-password");
    if (!onlineUsers || onlineUsers.length === 0) {
      return res.status(404).json({ message: "No online users found" });
    }
    res.status(200).json(onlineUsers);
  } catch (err) {
    console.error("❌ Error fetching online users:", err);
    res.status(500).json({ message: "Server error while fetching online users" });
  }
});

router.patch("/:id/status", protect, async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Status updated", status: updatedUser.status });
  } catch (err) {
    console.error("❌ Error updating user status:", err);
    res.status(500).json({ message: "Server error while updating status" });
  }
});

export default router;
