const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: String,
  text: String,
}, {
  timestamps: true,
  expireAfterSeconds: 86400, // 1 day auto-delete
});

module.exports = mongoose.model("Message", messageSchema);
