const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to verify admin/mod
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token missing" });

  jwt.verify(token, "secretkey", (err, user) => {
    if (err || (user.role !== "admin" && user.role !== "mod"))
      return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  });
}

// Get all users
router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Update user role
router.post("/set-role", verifyAdmin, async (req, res) => {
  const { username, role } = req.body;
  if (!["user", "mod", "admin"].includes(role)) return res.status(400).json({ error: "Invalid role" });

  const user = await User.findOneAndUpdate({ username }, { role }, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ message: "Role updated", user });
});

module.exports = router;
                                           
