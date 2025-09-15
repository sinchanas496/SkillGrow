// server/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // ✅ hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = makeToken(user._id);
    return res.status(201).json({
      message: "User registered",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = makeToken(user._id);
    return res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
