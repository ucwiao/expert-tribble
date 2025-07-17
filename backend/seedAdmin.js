const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

mongoose.connect("YOUR_MONGODB_URI");

async function createAdmin() {
  const existing = await User.findOne({ username: "admin" });
  if (existing) return console.log("⚠️ Admin already exists");

  const hash = await bcrypt.hash("admin123", 10);
  await User.create({
    username: "admin",
    password: hash,
    role: "admin"
  });

  console.log("✅ Admin created: username=admin, password=admin123");
  process.exit();
}

createAdmin();
