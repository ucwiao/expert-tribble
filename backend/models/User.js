const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  pfpUrl: String,
  role: { type: String, enum: ["user", "mod", "admin"], default: "user" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
