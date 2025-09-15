// server/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided. Access denied." });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user from token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    // 4. Attach user info to request
    req.user = user;
    next(); // Continue to the route
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ error: "Unauthorized - Invalid or expired token" });
  }
};
