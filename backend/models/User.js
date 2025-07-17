const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }, // 'user', 'admin', 'mod'
  profilePic: String
});

module.exports = mongoose.model("User", userSchema);
