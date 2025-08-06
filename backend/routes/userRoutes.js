// routes/user.js
import express from "express";
import User from "../models/User.js";
const router = express.Router();

// Get all users who are logged in
router.get("/online", async (req, res) => {
  try {
    const onlineUsers = await User.find({ isLoggedIn: true });
    res.json(onlineUsers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
