const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.cookies.sessionId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: err });
  });

  res.clearCookie("sessionId");

  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
