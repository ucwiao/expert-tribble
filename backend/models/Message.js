const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now, expires: 86400 } // auto delete in 24h
});

module.exports = mongoose.model("Message", messageSchema);
