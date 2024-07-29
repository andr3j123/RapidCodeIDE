const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);
  });

  return res.sendStatus(200);
});

module.exports = router;
