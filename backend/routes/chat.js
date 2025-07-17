const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token missing" });

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Send message
router.post("/send", verifyToken, async (req, res) => {
  const { text, room } = req.body;
  const newMessage = new Message({
    sender: req.user.id,
    text,
    room,
  });
  await newMessage.save();
  res.json({ message: "Message sent!" });
});

// Get messages by room
router.get("/room/:room", verifyToken, async (req, res) => {
  const messages = await Message.find({ room: req.params.room }).populate("sender", "username pfpUrl");
  res.json(messages);
});

module.exports = router;
