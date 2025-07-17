const router = require("express").Router();
const auth = require("../middleware/auth");
const Message = require("../models/Message");

router.get("/", auth, async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 });
  res.json(messages);
});

router.post("/", auth, async (req, res) => {
  const { content } = req.body;
  await Message.create({ sender: req.user.id, content });
  res.json({ msg: "Sent" });
});

module.exports = router;
