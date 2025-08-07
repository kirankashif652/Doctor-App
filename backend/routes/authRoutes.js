import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// ✅ User Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Something went wrong during signup" });
  }
});

// ✅ Login Route — returns JWT token and user info
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user existence
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Compare hashed passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid password" });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey", 
      { expiresIn: "7d" }
    );

    // Send token and user info
    res.json({
      token,
      role: user.role,
      email: user.email,
      name: user.name,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

export default router;
